import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout header={"Profile"}>
            <Head title="Profile" />
            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-base-800 mb-4">
                <UpdateProfileInformationForm
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                    className="max-w-xl"
                />
            </div>

            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-base-800 mb-4">
                <UpdatePasswordForm className="max-w-xl" />
            </div>

            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-base-800 mb-4">
                <DeleteUserForm className="max-w-xl" />
            </div>
        </AuthenticatedLayout>
    );
}
