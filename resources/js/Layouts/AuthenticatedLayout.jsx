import { usePage } from '@inertiajs/react';

import SidebarComp  from './Partials/SidebarComp'; './Partials/SidebarComp';
import HeaderComp from './Partials/HeaderComp';
import HeaderPage from './Partials/HeaderPage';
import Alert from './Partials/Alert';

export default function AuthenticatedLayout({ header, children, breadcrumbs }) {
    const user = usePage().props.auth.user;
    const flash = usePage().props.flash;

    return (
        <div>
                <SidebarComp/>
                <HeaderComp user={user}/>
                <main className='p-4 md:ml-64 mt-16'>
                <Alert flash={flash}/>

                  <HeaderPage header={header} breadcrumbs={breadcrumbs}/>
                  {children}
                </main>`
        </div>
      
    );
}
