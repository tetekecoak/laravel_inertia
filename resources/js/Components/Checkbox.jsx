export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-base-300 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:border-base-700 dark:bg-base-900 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800 ' +
                className
            }
        />
    );
}
