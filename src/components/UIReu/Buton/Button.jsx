export const Button = ({
    children,
    className,
    onClick,
    type,
    id,
    disabled,
    style
}) => {
    return (
    <button
        type={type || "button"}
        className={`btn ${className}`}
        id={id}
        disabled={disabled}
        onClick={onClick}
        style={style}
    >
        {children}
    </button>
    );
};
