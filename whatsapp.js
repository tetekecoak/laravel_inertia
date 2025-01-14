import { makeWASocket, DisconnectReason, useMultiFileAuthState } from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import * as fs from "fs";
import path from 'path';
import  amqp from 'amqplib';

const folderPath = "storage/app/private/whatsapid";
const sockets = {}
const connection = await amqp.connect("amqp://user:password@172.17.0.1:5672");
const channel = await connection.createChannel();

// Connect to WhatsApp
async function connectToWhatsApp(filepath = "default") {

    const { state, saveCreds } = await useMultiFileAuthState(`${folderPath}/${filepath}`);

    const sock = makeWASocket({
        auth: state,
    });

    sockets[filepath] = sock;

    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect, qr  } = update;

        if (qr) {
            console.log(`Scan the QR code for ${filepath}:`);
            channel.sendToQueue("whatsapp.deviceStatus", Buffer.from( JSON.stringify({
                id: filepath,
                qr: qr,
                status: "NEW",
            })), { persistent: true });
        }

        if (connection === "close") {
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            console.log("Reasonnnn", reason)
            if (reason == DisconnectReason.loggedOut) {
                sock.end()
                delete sockets[filepath]
                fs.rm(`${folderPath}/${filepath}`, { recursive: true }, (err) => {
                    if (err) {
                        console.error(`Error deleting folder for ${filepath}:`, err.message);
                    } else {
                        console.log(`Remove connection id ${filepath}.`);
                    }
                });
                channel.sendToQueue("whatsapp.deviceStatus", Buffer.from( JSON.stringify({
                    id: filepath,
                    qr: null,
                    status: "DISCONNECT",
                })), { persistent: true });
            }else if(reason == DisconnectReason.restartRequired){
                channel.sendToQueue("whatsapp.deviceStatus", Buffer.from( JSON.stringify({
                    id: filepath,
                    qr: null,
                    status: "CONNECTING",
                })), { persistent: true });
                console.log(`Restaring connection id ${filepath}.`);
                connectToWhatsApp(filepath)
            }else if(reason == DisconnectReason.badSession){
                 sock.end()
                 delete sockets[filepath]
                 fs.rm(`${folderPath}/${filepath}`, { recursive: true }, (err) => {
                    if (err) {
                        console.error(`Error deleting folder for ${filepath}:`, err.message);
                    } else {
                        console.log(`Remove connection id ${filepath}.`);
                    }
                });
            }else if(reason == DisconnectReason.timedOut){
                sock.end()
                delete sockets[filepath]
                fs.rm(`${folderPath}/${filepath}`, { recursive: true }, (err) => {
                   if (err) {
                       console.error(`Error deleting folder for ${filepath}:`, err.message);
                   } else {
                       console.log(`Remove connection id ${filepath}.`);
                   }
               });
           }
        } else if (connection === "open") {
            channel.sendToQueue("whatsapp.deviceStatus", Buffer.from( JSON.stringify({
                id: filepath,
                qr: null,
                status: "CONNECTED",
            })), { persistent: true });
            console.log(`Connection opened for id ${filepath}!`);
        }
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("messages.upsert", ({ messages }) => {
        channel.sendToQueue("whatsapp.chat", Buffer.from( JSON.stringify(messages)), { persistent: true });
        console.log(`Received messages for ${filepath}:`, messages);
    });

    return sock;
}



// Initialize multiple accounts
async function initializeMultipleAccounts(accountIds) {
    for (const id of accountIds) {
        console.log(`Initializing account: ${id}`);
        await connectToWhatsApp(id);
    }
}


function getExistingWhatsappID() {
        if (!fs.existsSync(folderPath)) {
            // Recursively create the folder if it doesn't exist
            fs.mkdirSync(folderPath, { recursive: true });
            console.log(`Folder created at: ${folderPath}`);
        } 
    
    // Read all files and directories in the given path
    const files = fs.readdirSync(folderPath);

    // Filter out the directories (folders)
    const folders = files.filter(file => {
        const fullPath = path.join(folderPath, file);
        return fs.statSync(fullPath).isDirectory();
    });

    return folders;
}

(async () => {

    const accounts = getExistingWhatsappID()

    if (accounts.length === 0) {
        console.log("No account IDs provided");
    }else{
        await initializeMultipleAccounts(accounts);
    }

    const produceQueue = ['whatsapp.deviceStatus','whatsapp.chat'];
    const consumerQueue = ['whatsapp.createConnection','whatsapp.removeConnection','whatsapp.sendMessage'];

    try {
        for(const queue of produceQueue ){
            await channel.assertQueue(queue, { durable: true, arguments: {
                'x-queue-type': 'quorum', 
            }, });
        }
        for(const queue of consumerQueue ){
            await channel.assertQueue(queue, { durable: true, arguments: {
                'x-queue-type': 'quorum', 
            }, });
        }

        for (const queue of consumerQueue) {

            console.log(`Waiting for messages in ${queue}. To exit press CTRL+C`);

            channel.consume(queue, (msg) => {
                if (msg !== null) {
                    const responseData = JSON.parse(msg.content.toString('utf-8'));
                    if (queue === "whatsapp.createConnection") {
                        if (!sockets[msg.content.toString()]) {
                             connectToWhatsApp(responseData.id);
                        } 
                    }
                    if (queue === "whatsapp.removeConnection") {
                        sockets[responseData.id].ev.emit("connection.update", { connection: "close" });
                    }
                    console.log(`Received from ${queue}: ${msg.content.toString()}`);
                    channel.ack(msg); // Acknowledge pesan
                }
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }

})();
