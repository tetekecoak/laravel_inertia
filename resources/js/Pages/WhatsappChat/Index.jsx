import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { HiPlus } from 'react-icons/hi';
import {Button, Avatar} from 'flowbite-react';
import usePermission from '@/Hooks/PermissionHook';
import echo from '@/echo';

import { useEffect, useState }  from 'react';


export default function Index({title,whatsappChat}) {

    const [data ,setData] = useState(whatsappChat)

    useEffect(() => {
        const channel = echo.private('Whatsapp.1')
            .listen('WhatsappChatEvent', (event) => {
                console.log("oke")
            });

        // Clean up the listener when the component unmounts
        return () => {
             // Leave the channel properly
            channel.stopListening('WhatsappChatEvent');
            echo.leaveChannel('Whatsapp.1');
        };
    }, []); // Empty dependency array ensures this runs only once

    return (
        <AuthenticatedLayout
            header={title}
        >
            <Head title={title} />
            <div className="flex space-x-2">
                        <div className="max-w-72 min-h-screen bg-base-800 text-base-800 dark:text-base-100">
                            <div className="flex items-start space-x-2">
                                <Avatar rounded/>
                                <div className="flex-1">
                                    <div>Name</div>
                                    <div className="text-sm">Text Last Message</div>
                                </div>
                                <div className="text-sm ">
                                    Now
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 text-base-800 dark:text-base-100">
                            <div className="flex flex-col space-y-4">

                                {/* Message from friend (left side) */}
                                { data.map((item,key) =>  {
                                    const fromMe = item.key?.fromMe;
                                    return fromMe ? 
                                            <div key={key} className="flex justify-end space-x-2 items-end">
                                            <div className="flex items-end space-x-2">
                                                <div className="bg-primary-500 text-white p-2 rounded-lg max-w-xs text-wrap">
                                                {item.message?.conversation}
                                                </div>
                                                <Avatar rounded/>
                                            </div>
                                        </div> :
                                        <div key={key} className="flex justify-start space-x-2 items-end">
                                        <Avatar rounded className="mt-2" />
                                        <div className="bg-base-700 text-base-900 dark:text-base-100 p-2 rounded-lg max-w-xs text-wrap">
                                            {item.message?.conversation}
                                        </div>
                                    </div>

                                } )}
                               
                            </div>
                        </div>

            </div>
               
        </AuthenticatedLayout>
    );
}
