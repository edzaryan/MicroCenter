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
    font-sans transition-all duration-200 ease-in-out
    ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer"}
    ${block ? "w-full" : ""}
  `;

  const sizeClasses = {
    sm: "text-sm px-3 py-1.5",
    md: "text-[16px] px-4 py-2",
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
        primary: "border border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50",
        secondary: "border border-gray-500 text-gray-600 bg-transparent hover:bg-gray-100",
        success: "border border-green-600 text-green-600 bg-transparent hover:bg-green-50",
        danger: "border border-red-600 text-red-600 bg-transparent hover:bg-red-50",
        warning: "border border-yellow-500 text-yellow-600 bg-transparent hover:bg-yellow-50",
        light: "border border-gray-200 text-gray-700 bg-transparent hover:bg-gray-50",
        link: "underline text-blue-600 bg-transparent border-none",
      }[variant]
    : {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-600 text-white hover:bg-gray-700",
        success: "bg-green-600 text-white hover:bg-green-700",
        danger: "bg-red-600 text-white hover:bg-red-700",
        warning: "bg-yellow-400 text-black hover:bg-yellow-500",
        light: "bg-gray-100 text-black hover:bg-gray-200",
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
      className={`${baseClasses} ${sizeClasses} ${shapeClasses} ${variantClasses}`}
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
