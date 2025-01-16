import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,Link, router } from '@inertiajs/react';
import { HiPencilAlt, HiPlus, HiTrash } from "react-icons/hi";
import { Table ,Button} from "flowbite-react";
import useModal from '@/Hooks/ModalHook';
import ModalDelete from '@/Components/ModalDelete';
import usePermission from '@/Hooks/PermissionHook';


export default function Tag({title, categories}) {
    const breadcrumbs = [{link : null,name : "Tag"}]
    const data = categories

    const { isOpen, data: selectedId, openModal, closeModal } = useModal();
    const handleDelete = () => {
        router.delete(route('blog-categories.delete',selectedId),{
            onFinish : () => {
                closeModal()
            }
        })
       
    }
  
    return (
        <AuthenticatedLayout header={title} breadcrumbs={breadcrumbs}>
            <Head title={title} />
                <div className='flex flex-wrap justify-between mb-4'>
                    <div>
                        {usePermission('blog-categories.create') && <Link href={route('blog-categories.create')}><Button color='primary'> <HiPlus className="mr-2 h-5 w-5"/> <span>Add Category</span> </Button></Link> }
                    </div>
                </div>
                <div className="relative overflow-x-auto">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Title</Table.HeadCell>
                            <Table.HeadCell>Slug</Table.HeadCell>
                            <Table.HeadCell>Content</Table.HeadCell>
                            <Table.HeadCell>Action</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {data.map((item) => (
                                <Table.Row key={item.id} className="bg-white dark:border-base-700 dark:bg-base-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-base-900 dark:text-white">{item.title}</Table.Cell>
                                    <Table.Cell>{item.slug}</Table.Cell>
                                    <Table.Cell>{item.content}</Table.Cell>
                                    <Table.Cell className='flex space-x-2'>
                                        {usePermission('blog-categories.edit') && <Link href={route('blog-categories.edit',item.id)} className="hover:text-yellow-300  "><HiPencilAlt className='h-4 w-4'></HiPencilAlt></Link> }
                                        {usePermission('blog-categories.delete') && <div onClick={() => openModal(item.id)} className="hover:text-red-500"><HiTrash className='h-4 w-4'></HiTrash></div>  }
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                    
                </div>
                    <ModalDelete isOpen={isOpen} onClose={()=>closeModal()} onSubmit={()=> handleDelete()} />
        </AuthenticatedLayout>
    );
}
