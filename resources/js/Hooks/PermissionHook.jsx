
import { usePage } from '@inertiajs/react';

const usePermission = (permission) => {
    const authPermissions= usePage().props.auth.permissions
    const authRoles= usePage().props.auth.roles

    if (authRoles.includes('superadmin')) {
        return true
    }

     // Cek izin berdasarkan prefiks (e.g., "blog*" mencakup "blogcategory.index")
    return authPermissions.some(authPermission => {
        if (authPermission.endsWith('*')) {
            const prefix = authPermission.replace('*', '');
            return permission.startsWith(prefix);
        }
        else{
            return authPermissions.includes(permission);

        }
    });

};

export default usePermission;
