import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,useForm, usePage ,router} from '@inertiajs/react';
import {FormInput,FormSelect} from '@/Components/MyForm';
import { Button } from 'flowbite-react';
import { FaSave,FaArrowLeft } from "react-icons/fa";

export default function Form({title, user,roles}) {
    
    const { data, setData, post,patch, errors, processing } =
        useForm({
            name: user?.name,
            email: user?.email,
            password: '',
            status : user?.status,
            role : user?.role
    });


    const handleSave = (e) => {
        e.preventDefault();
        if (user) {
            patch(route('users.update',user))
        }
        else
        post(route('users.store'))
    }

    const breadcrumbs = [{link : route('users.index'),name : "User"},{link : null,name : title}]

    return (
        <AuthenticatedLayout
            header={title}
            breadcrumbs={breadcrumbs}
        >
            <Head title={title} />
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-base-800">
                <div className="p-6 text-base-900 dark:text-base-100">
                    <form onSubmit={handleSave}>
                        <FormSelect width='w-max' label="Role" value={data.role} onChange={(e) => setData('role', e.target.value)} error={errors.role} required>
                            <option value="">Select Role</option>
                            {roles.map((item,key) => (
                                <option key={key} value={item.name}>{item.name}</option>

                            ))}
                        </FormSelect>
                        <FormInput id="name"  label={"Name"} value={data.name} onChange={(e) => setData('name', e.target.value)} error={errors.name} placeholder={"Name"} />
                        <FormInput id="email" type="email" label={"Email"} value={data.email} onChange={(e) => setData('email', e.target.value)} error={errors.email} placeholder={"Email"} required/>
                        <FormInput id="password" type="password" label={"Password"} value={data.password} onChange={(e) => setData('password', e.target.value)} error={errors.password} placeholder={"Password"} required={data ? false :true}/>
                        <FormSelect width='w-max' label="Status" value={data.status} onChange={(e) => setData('status', e.target.value)} error={errors.status} required>
                            <option value="">Select Status</option>
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </FormSelect>
                        
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
