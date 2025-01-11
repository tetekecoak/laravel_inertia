import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,useForm} from '@inertiajs/react';
import {FormInput, FormTextArea} from '@/Components/MyForm';
import { Button } from 'flowbite-react';
import { FaSave,FaArrowLeft } from "react-icons/fa";

export default function Form({title ,tag }) {
    
    const { data, setData, post,patch, errors, processing } =
        useForm({
            title: tag?.title,
            content: tag?.content
    });


    const handleSave = (e) => {
        e.preventDefault();
        if (tag) {
            patch(route('blog-tags.update',tag))
        }
        else
        post(route('blog-tags.store'))
    }

    const breadcrumbs = [{link : route('blog-tags.index'),name : "Tag"},{link : null,name : title}]

    return (
        <AuthenticatedLayout
            header={title}
            breadcrumbs={breadcrumbs}
        >
            <Head title={title} />
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-base-800">
                <div className="p-6 text-base-900 dark:text-base-100">
                    <form onSubmit={handleSave}>
                        <FormInput id="title"  label={"Title"} value={data.title} onChange={(e) => setData('title', e.target.value)} error={errors.title} placeholder={"title"} />
                        <FormTextArea id="content"  label={"Content"} value={data.content} onChange={(e) => setData('content', e.target.value)} error={errors.content} placeholder={"content"} />
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
