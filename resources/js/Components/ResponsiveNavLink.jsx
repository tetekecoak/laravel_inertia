import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-indigo-400 bg-indigo-50 text-indigo-700 focus:border-indigo-700 focus:bg-indigo-100 focus:text-indigo-800 dark:border-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300 dark:focus:border-indigo-300 dark:focus:bg-indigo-900 dark:focus:text-indigo-200'
                    : 'border-transparent text-base-600 hover:border-base-300 hover:bg-base-50 hover:text-base-800 focus:border-base-300 focus:bg-base-50 focus:text-base-800 dark:text-base-400 dark:hover:border-base-600 dark:hover:bg-base-700 dark:hover:text-base-200 dark:focus:border-base-600 dark:focus:bg-base-700 dark:focus:text-base-200'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
