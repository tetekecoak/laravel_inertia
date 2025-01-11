import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={ "Dashboard "}
        >
            <Head title="Dashboard" />
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-base-800">
                    <div className="p-6 text-base-900 dark:text-base-100">
                        You're logged in!
                    </div>
                </div>
        </AuthenticatedLayout>
    );
}
