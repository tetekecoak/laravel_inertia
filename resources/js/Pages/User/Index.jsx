import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,Link, router ,usePage} from '@inertiajs/react';
import { HiOutlineSearch, HiPencilAlt, HiPlus, HiTrash } from "react-icons/hi";
import useFilter from '@/Hooks/FilterHook';
import { Checkbox, Table,Badge ,Button, Dropdown} from "flowbite-react";
import usePagination from '@/Hooks/PaginationHook';
import {FormInput } from '@/Components/MyForm';
import useModal from '@/Hooks/ModalHook';
import ModalDelete from '@/Components/ModalDelete';
import usePermission from '@/Hooks/PermissionHook';
import { useSelectAll } from '@/Hooks/SelectAllHook';


export default function User({title, users}) {
    const breadcrumbs = [{link : null,name : "User"}]
    

    const {data, ...pagination} = users
    const {PaginationComponent} = usePagination(pagination,['users'])
    const { filter,handleFilter } = useFilter(['users'])

    const { isOpen, data: selectedId, openModal, closeModal } = useModal();
    const handleDelete = () => {
        if ( Array.isArray(selectedId)) {
            router.delete(route('users.bulk-delete',{'ids' : selectedId}),{
                onFinish : () => {
                    closeModal()
                }
            })
        }
        else
        router.delete(route('users.delete',selectedId),{
            onFinish : () => {
                closeModal()
            }
        })
    }

    const {
        selectedItems,
        selectAll,
        handleSelectAllChange,
        handleCheckboxChange,
        isSelected,
      } = useSelectAll(data);

  
    return (
        <AuthenticatedLayout header={title} breadcrumbs={breadcrumbs}>
            <Head title={title} />
                <div className='flex flex-wrap justify-between mb-4'>
                    <div className='flex justify-center flex-wrap space-x-2'>
                        {usePermission('users.create') && <Link href={route('users.create')}><Button color='primary'> <HiPlus className="mr-2 h-5 w-5"/> <span>Add User</span> </Button></Link> }
                        {(selectedItems.length > 0) && <Button color='red' onClick={() => openModal(selectedItems)}> <HiTrash className="h-5 w-5"/></Button> }
                    </div>
                    <div className='flex flex-wrap items-center space-x-2'>
                        <Dropdown color='secondary' label={"Status: "+(filter.status?.toUpperCase() ?? 'All')} dismissOnClick={true}>
                            <Dropdown.Item onClick={()=>handleFilter('status',null)}>All</Dropdown.Item>
                            <Dropdown.Item onClick={()=>handleFilter('status','active')}>Active</Dropdown.Item>
                            <Dropdown.Item onClick={()=>handleFilter('status','inactive')}>Inactive</Dropdown.Item>
                        </Dropdown>
                        <FormInput id="search" value={filter.search} onChange={ (e) => handleFilter('search',e.target.value)} type="text" icon={HiOutlineSearch} placeholder="Search"/>
                    </div>
                </div>
                <div className="relative overflow-x-auto">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell className="p-4">
                                <Checkbox  checked={selectAll} onChange={handleSelectAllChange} />
                            </Table.HeadCell>
                            <Table.HeadCell>Name</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Role</Table.HeadCell>
                            <Table.HeadCell>Status</Table.HeadCell>
                            <Table.HeadCell>Action</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {data.map((item) => (
                                <Table.Row key={item.id} className="bg-white dark:border-base-700 dark:bg-base-800">
                                    <Table.Cell className="p-4"><Checkbox    checked={isSelected(item.id)} onChange={() => handleCheckboxChange(item.id)}/></Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-base-900 dark:text-white">{item.name}</Table.Cell>
                                    <Table.Cell>{item.email}</Table.Cell>
                                    <Table.Cell>{item.role}</Table.Cell>
                                    <Table.Cell><Badge color={item.status ? 'success' : 'gray'} className='w-max'>{item.status ? 'Active' : 'Inactive'}</Badge></Table.Cell>
                                    <Table.Cell className='flex space-x-2'>
                                        {usePermission('users.edit') && <Link href={route('users.edit',item.id)} className="hover:text-yellow-300  "><HiPencilAlt className='h-4 w-4'></HiPencilAlt></Link> }
                                        {usePermission('users.delete') && <div onClick={() => openModal(item.id)} className="hover:text-red-500"><HiTrash className='h-4 w-4'></HiTrash></div>  }
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                    
                </div>
                    <PaginationComponent/>
                    <ModalDelete isOpen={isOpen} onClose={()=>closeModal()} onSubmit={()=> handleDelete()} />
                    {/* <Modal
                        size='md'
                        show={isOpen}
                        position={"center"}
                        onClose={() => closeModal()}
                    >
                        <Modal.Body>
                            <div className="flex justify-center flex-col space-y-4 items-center">
                                <IoIosWarning className='w-10 h-10'/>
                                <div className='text-xl'> Are you sure want delete this data?</div>
                                <div className='flex space-x-2'>
                                <Button color="secondary" onClick={() => closeModal()}>
                                    Cancel
                                </Button>
                                <Button color='red' onClick={() => handleDelete()}>Yes,Delete it !</Button>
                               
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal> */}
               
        </AuthenticatedLayout>
    );
}
