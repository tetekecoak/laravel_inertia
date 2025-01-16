import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useEffect,useState } from 'react';
import { HiPlus, HiPencilAlt, HiTrash } from 'react-icons/hi';
import { FaArrowLeft, FaSave, FaCheck , FaQrcode} from 'react-icons/fa';
import ModalDelete from '@/Components/ModalDelete';
import { Modal, ModalBody, Badge, ModalHeader, Table , Button, Spinner} from 'flowbite-react';
import useModal from '@/Hooks/ModalHook';
import usePermission from '@/Hooks/PermissionHook';
import { FormInput, FormPhone } from '@/Components/MyForm';
import QRCode from "qrcode";
import echo from '@/echo'

export default function Index({title,whatsAppDevice}) {

    const { data:form, setData, post,patch, errors,setError, processing } =
            useForm({
                name: "",
                phone_number: "" ,
    });

    const [qrcode ,setQrcode] = useState({
        id : null,
        qr: null,
        status: null
    })

    const data = whatsAppDevice;

    const { isOpen, data: selectedId, openModal, closeModal } = useModal();
    const { isOpen:isOpenQr, data: selectedQr, openModal: openModalQr, closeModal:closeModalQr } = useModal();
    const { isOpen:isOpenModalDelete, data:selectedIdDelete, openModal: openModalDelete, closeModal:closeModalDelete } = useModal();


    const handleSave = (e) =>{
        e.preventDefault()
        if (!selectedId) {
            post(route("whatsapp-devices.store"),{
                onSuccess : () => {
                    closeModal()
                    setData({})
                }
            })
        }else{
            patch(route("whatsapp-devices.update",selectedId),{
                onSuccess : () => {
                    closeModal()
                    setData({})
                }
            })
        }
       
    }

    const handleForm = (data) =>{
        setError('name', null)
        setError('phone_number', null)
        if(data){
            setData({
                name : data.name,
                phone_number : data.phone_number,
            })
            openModal(data.id)
            
        }else{
            setData({
                name : "",
                phone_number : "",
            })
            openModal()
        }
        
    }

    const handleDelete = () => {
        console.log(selectedId)
        router.delete(route('whatsapp-devices.delete',selectedIdDelete),{
            onFinish : () => {
                closeModalDelete()
            }
        })
    }

    const handleQrcode = (item) =>{
        setQrcode({
            id : item.phone_number,
            qr : null,
            status : 0
        });  
        router.post(route('whatsapp-devices.scan-qrcode',item.id),{},{
            onSuccess : () => openModalQr()
        })
       
    }

    const handleCloseModalQr = () => {
        setQrcode({}); 
        closeModalQr()
    }

    const colorBadge = (v) => {
        switch (v) {
            case 0:
                return ["Not Connected","gray"]
            case 1:
                    return ["Connected","success"]
            default:
                return ["Disconnect","failure"]
                 
                break;
        }
    }

    useEffect(() => {
        echo.channel('Whatsapp')
            .listen('WhatsappQrcodeEvent', (event) => {
                console.log(event.data.status)
                if (event.data.id === qrcode.id) {
                    if (event.data.status == 0) {
                        QRCode.toDataURL(event.data.qr, { width: 300 }, (err, url) => {
                            if (err) {
                                console.error("Failed to generate QR code:", err);
                                return;
                            }
                            setQrcode({
                                id: event.data.id,
                                qr: url,
                                status: 0,
                            });
                        });
                }else if (event.data.status == 2) {
                    setQrcode({...qrcode,status : 2});  
                }else if(event.data.status == 1){
                            setQrcode({...qrcode,status : 1});  
                            router.reload({
                                only: ['whatsAppDevice'],
                                onFinish :() => {
                                    closeModalQr()
                                    setQrcode({});  
                                }
                            });
                }else{
                    router.reload({
                        only: ['whatsAppDevice'],
                        onFinish :() => {
                            closeModalQr()
                            setQrcode({});  
                        }
                    });
                }
                }
                else
                router.reload({
                    only: ['whatsAppDevice'],
                });
            });

        // Clean up the listener when the component unmounts
        return () => {
            echo.leaveChannel('Whatsapp');
        };
    }, [handleQrcode]); // Empty dependency array ensures this runs only once
    return (
        <AuthenticatedLayout
            header={title}
        >
            <Head title={title} />
            <div className='flex flex-wrap justify-between mb-4'>
                    <div>
                        {usePermission('whatsapp-devices.create') && <Button color='primary' onClick={handleForm}> <HiPlus className="mr-2 h-5 w-5"/> <span>Add Device</span> </Button> }
                    </div>
                </div>
            <div className="relative overflow-x-auto">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Name</Table.HeadCell>
                            <Table.HeadCell>Phone Number</Table.HeadCell>
                            <Table.HeadCell>Status</Table.HeadCell>
                            <Table.HeadCell>Action</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {data.map((item) => (
                                <Table.Row key={item.id} className="bg-white dark:border-base-700 dark:bg-base-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-base-900 dark:text-white">{item.name}</Table.Cell>
                                    <Table.Cell>{item.phone_number}</Table.Cell>
                                    <Table.Cell> <Badge className='w-max' color={colorBadge(item.status)[1]}>{colorBadge(item.status)[0]}</Badge></Table.Cell>
                                    <Table.Cell className='flex space-x-2'>
                                        <Button color="secondary" size='xs' onClick={()=> handleQrcode(item)}  > <FaQrcode className="h-5 w-5"/></Button>
                                        <Button color="secondary" size='xs' onClick={()=> handleForm(item)}  > <HiPencilAlt className='h-5 w-5'></HiPencilAlt></Button>
                                        <Button color="secondary" size='xs' onClick={()=> openModalDelete(item.id)}  > <HiTrash className='h-5 w-5'></HiTrash></Button>
                                        {/* {usePermission('users.delete') && <div onClick={() => openModal(item.id)} className="hover:text-red-500"><HiTrash className='h-4 w-4'></HiTrash></div>  } */}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                    
                </div>
         <Modal size="md" show={isOpen} position="center" onClose={closeModal} >
            <ModalHeader>{ selectedId ? "Edit Device" : "Add Device"}</ModalHeader>
            <form onSubmit={(e)=>handleSave(e)}>
            <ModalBody>
                <FormInput id="name"  label={"Name"} value={form.name} onChange={(e) => setData('name', e.target.value)} error={errors.name} placeholder={"Name"} />
                <FormPhone id="phone_number" label={"Phone Number"} onChange={(e) => setData('phone_number', e)} value={form.phone_number} error={errors.phone_number} />
                
                {/* <FormInput id="phone_number"  label={"Phone Number"} value={form.phone_number} onChange={(e) => setData('phone_number', e.target.value)} error={errors.phone_number} placeholder={"Phone number"} /> */}
              
                <div className="flex space-x-2 mt-4">
                    <Button color="secondary" onClick={closeModal}  > <FaArrowLeft className="mr-2 h-5 w-5"/> Cancel</Button>
                    <Button color='primary'disabled={processing} type='submit'> <FaSave className="mr-2 h-5 w-5"/> Save</Button>
                </div>
            </ModalBody>
            </form>
         </Modal>

         <Modal  size="md" show={isOpenQr} position="center" onClose={handleCloseModalQr} >
         <Modal.Header>Scan QR</Modal.Header>
         <ModalBody>
            <div className="flex w-full items-center flex-col space-y-2 justify-center">
                {/* QR Code or Spinner for Generating QR Code */}
                <div>
                    {qrcode.status === 0 && (
                        qrcode.qr ? <img src={qrcode.qr} alt="Generating QR Code" /> : <div>
                        <Spinner className="mr-2" />
                        <span>Generating QR Code</span>
                    </div>
                        
                    )}   
                </div>

                {/* Connection Status */}
                <div>
                    {qrcode.status === 2 && (
                        <div>
                            <Spinner className="mr-2" />
                            <span>Connecting</span>
                        </div>
                    )}
                    {qrcode.status === 1 && (
                        <div className="flex text-green-500">
                            <FaCheck className="mr-2 w-5 h-5" />
                            <span>Connected</span>
                        </div>
                    )}
                </div>
            </div>
        </ModalBody>
         </Modal>
         <ModalDelete isOpen={isOpenModalDelete} onClose={()=>closeModalDelete()} onSubmit={()=> handleDelete()} />
        </AuthenticatedLayout>
    );
}
