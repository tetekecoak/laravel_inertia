import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-indigo-400 text-base-900 focus:border-indigo-700 dark:border-indigo-600 dark:text-base-100'
                    : 'border-transparent text-base-500 hover:border-base-300 hover:text-base-700 focus:border-base-300 focus:text-base-700 dark:text-base-400 dark:hover:border-base-700 dark:hover:text-base-300 dark:focus:border-base-700 dark:focus:text-base-300') +
                className
            }
        >
            {children}
        </Link>
    );
}
