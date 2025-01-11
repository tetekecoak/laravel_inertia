export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center rounded-md border border-base-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-base-700 shadow-sm transition duration-150 ease-in-out hover:bg-base-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 dark:border-base-500 dark:bg-base-800 dark:text-base-300 dark:hover:bg-base-700 dark:focus:ring-offset-gray-800 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
