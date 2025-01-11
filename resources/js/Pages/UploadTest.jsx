import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,useForm, usePage ,router} from '@inertiajs/react';
import {FormInput,FormSelect} from '@/Components/MyForm';
import { Button } from 'flowbite-react';
import { FaSave,FaArrowLeft } from "react-icons/fa";
import { Label,FileInput } from 'flowbite-react';

export default function Form({title,files}) {

    const { data, setData, post, progress } = useForm({
        file: null,
      })

    const handleSave = (e) => {
        e.preventDefault()
        post(route('upload-test.store'),{
            forceFormData : true
        })
    }   


    return (
        <AuthenticatedLayout
            header={title}
        >
            <Head title={title} />
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-base-800">
            <div className="p-6 text-base-900 dark:text-base-100">
                    {files.map((item,key) => (<div>{item}</div>) )}
                </div>
                <div className="p-6 text-base-900 dark:text-base-100">
                    <form onSubmit={(e) => handleSave(e)}>
                        <div>
                            <div>
                                <Label htmlFor="file-upload-helper-text" value="Upload file" />
                            </div>
                            <FileInput   id="file-upload-helper-text" onChange={e => setData('file', e.target.files[0])} helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)." />
                        </div>
                        <div className="flex space-x-2 mt-4">
                            <Button color="secondary" onClick={()=>window.history.back()}  > <FaArrowLeft className="mr-2 h-5 w-5"/> Cancel</Button>
                            <Button color='primary' type='submit'> <FaSave className="mr-2 h-5 w-5"/> Save</Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
