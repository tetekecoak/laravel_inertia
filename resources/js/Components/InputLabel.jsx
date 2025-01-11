export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-sm font-medium text-base-700 dark:text-base-300 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
