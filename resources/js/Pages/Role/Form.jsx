import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,useForm} from '@inertiajs/react';
import {FormInput} from '@/Components/MyForm';
import { useEffect, useState } from 'react';
import { Button, HelperText } from 'flowbite-react';
import { FaSave,FaArrowLeft } from "react-icons/fa";
import { Table,Label,Checkbox } from 'flowbite-react';

export default function Form({title,permissions ,role }) {
    
    const { data, setData, post,patch, errors, processing } =
        useForm({
            name: role?.name,
            permissions : role?.permission_pluck ?? []
    });

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const selectedPermission = permissions.map(item => item.permissions).flat();
            setData('permissions',selectedPermission)
            
        }else{
            setData('permissions',[])

        }
    }

    const handleGroupSelect = (e) => {
        const permissionsArray = e.target.value.split(',');
        if (e.target.checked) {
            setData('permissions',[...data.permissions,...permissionsArray])
            
        }else{
            setData('permissions',data.permissions.filter((item) => !permissionsArray.includes(item)))

        }
    }

    const handleSave = (e) => {
        e.preventDefault();
        if (role) {
            patch(route('roles.update',role))
        }
        else
        post(route('roles.store'))
    }

    const handleChecked = (e) => {
         if (e.target.checked) {
            setData('permissions',[...data.permissions,e.target.value])
         }
         else
         setData('permissions',data.permissions.filter((item) => item !== e.target.value))
    }

    const breadcrumbs = [{link : route('roles.index'),name : "Role"},{link : null,name : title}]

    return (
        <AuthenticatedLayout
            header={title}
            breadcrumbs={breadcrumbs}
        >
            <Head title={title} />
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-base-800">
                <div className="p-6 text-base-900 dark:text-base-100">
                    <form onSubmit={handleSave}>
                        <FormInput id="name"  label={"Name"} value={data.name} onChange={(e) => setData('name', e.target.value)} error={errors.name} placeholder={"Name"} />
                        <div className='mt-2'>
                        <Label>Permissions</Label>
                        <Table className='mt-2'>
                            <Table.Head>
                                <Table.HeadCell></Table.HeadCell>
                                <Table.HeadCell>Permission</Table.HeadCell>
                                <Table.HeadCell >
                                <div className="flex items-center gap-2">
                                    <Checkbox className='hidden' id="selectAllPermission" value={"all"}  onChange={(e)=> handleSelectAll(e)}  />
                                    <label className='hover:text-blue-500' htmlFor='selectAllPermission'>All | None</label>
                                </div>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {permissions.map((item,key) => (
                                    <Table.Row key={key} className="bg-white dark:border-base-700 dark:bg-base-800">
                                        <Table.Cell className="p-4">{item.name}</Table.Cell>
                                        <Table.Cell className="p-4"> 
                                            <div className='flex space-x-2'>
                                                {item.permissions.map((permission,key) => (
                                                    <div key={key} className="flex items-center gap-2">
                                                        <Checkbox value={permission} checked={data.permissions.includes(permission)}  onChange={(e)=> handleChecked(e)} id={key} />
                                                        <Label htmlFor={key} className="flex">
                                                            {permission.split('.')[1]}
                                                        </Label>
                                                  </div>
                                                )                                                
                                            )}
                                            </div></Table.Cell>
                                        <Table.Cell>
                                            <div className="flex items-center gap-2">
                                                <Checkbox className='hidden' id={"select-group-"+item.name} value={item.permissions}  onChange={(e)=> handleGroupSelect(e)}  />
                                                <label className='hover:text-blue-500' htmlFor={"select-group-"+item.name}>
                                                    All | None
                                                </label>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                        <HelperText color='failure'>
                            {errors.permissions}
                        </HelperText>
                        </div>
                       
                        
                        <div className="flex space-x-2 mt-4">
                            <Button color="secondary" onClick={()=>window.history.back()}  > <FaArrowLeft className="mr-2 h-5 w-5"/> Cancel</Button>
                            <Button color='primary'disabled={processing} type='submit'> <FaSave className="mr-2 h-5 w-5"/> Save</Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
