
const Button = ({
    onClick,
    children,
    variant = "primary",
    size = "md",
    disabled = false,
    block = false,
    shape = "shaped",
    icon,
    iconPosition = "start",
    outline = false,
}) => {
    const baseClasses = `
        inline-flex items-center justify-center gap-2
        font-sans transition duration-200
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${block ? "w-full" : ""}
    `;

    const sizeClasses = {
        sm: "text-sm px-2 py-1",
        md: "text-sm px-4 py-2",
        lg: "text-base px-6 py-3",
    }[size];

    const shapeClasses = {
        none: "rounded-none",
        shaped: {
            sm: "rounded-[4px]",
            md: "rounded-[6px]",
            lg: "rounded-[8px]",
        }[size],
        rounded: "rounded-full",
    }[shape];

    const variantClasses = outline
        ? {
              primary: "border border-blue-600 text-blue-600 bg-transparent",
              secondary: "border border-gray-500 text-gray-600 bg-transparent",
              success: "border border-green-600 text-green-600 bg-transparent",
              danger: "border border-red-600 text-red-600 bg-transparent",
              warning: "border border-yellow-500 text-yellow-600 bg-transparent",
              light: "border border-gray-200 text-gray-700 bg-transparent",
              link: "underline text-blue-600 bg-transparent border-none",
          }[variant]
        : {
              primary: "bg-blue-600 text-white",
              secondary: "bg-gray-600 text-white",
              success: "bg-green-600 text-white",
              danger: "bg-red-600 text-white",
              warning: "bg-yellow-400 text-black",
              light: "bg-gray-100 text-black",
              link: "underline text-blue-600 bg-transparent",
          }[variant];

    const iconSizeClasses = {
        sm: "text-[14px]",
        md: "text-[18px]",
        lg: "text-[22px]",
    }[size];

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${sizeClasses} ${variantClasses} ${shapeClasses}`}
        >
            {icon && iconPosition === "start" && (
                <span className={`${iconSizeClasses} flex items-center`}>
                    {icon}
                </span>
            )}

            <span>{children}</span>

            {icon && iconPosition === "end" && (
                <span className={`${iconSizeClasses} flex items-center`}>
                    {icon}
                </span>
            )}
        </button>
    );
};

export default Button;
