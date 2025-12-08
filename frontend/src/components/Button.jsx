import { styled, css } from "../utils/imports";


const Button = ({
    onClick,
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    block,
    shape = 'shaped',
    icon,
    iconPosition = 'start',
    outline
}) => (
    <StyledButton
        disabled={disabled}
        onClick={onClick}
        $sizeVariant={size}
        $variant={variant}
        $block={block}
        $shapeVariant={shape}
        $shapeSize={size}
        $outline={outline}
    >
        {icon && iconPosition === 'start' && <IconWrapper $sizeVariant={size}>{icon}</IconWrapper>}
        <span>{children}</span>
        {icon && iconPosition === 'end' && <IconWrapper $sizeVariant={size}>{icon}</IconWrapper>}
    </StyledButton>
);


export default Button;


const StyledButton = styled.button`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border: none;
  cursor: pointer;
  text-align: center;
  font-family: Arial;
  transition: 0.2s;

  ${({ $sizeVariant }) => sizeVariants[$sizeVariant]}
  ${({ $variant, $outline }) => $outline ? buttonOutlineVariants[$variant] : buttonVariants[$variant]}
  ${({ $block }) => $block && css`width: 100%;`}
  ${({ $shapeVariant, $shapeSize }) => shapeStyles[$shapeVariant]($shapeSize)}

  &:hover {
    opacity: 0.8;
  }
`;

const IconWrapper = styled.span`
    display: inline-flex;
    align-items: center;
    ${({ $sizeVariant }) => iconSizeVariants[$sizeVariant]}
`;

const iconSizeVariants = {
    sm: css`
      font-size: 14px;
    `,
    md: css`
      font-size: 18px;
    `,
    lg: css`
      font-size: 22px;
    `,
};

const sizeVariants = {
    sm: css`
      font-size: 14px;
      padding: 3px 8px;
    `,
    md: css`
      font-size: 14px;
      padding: 4px 15px;
    `,
    lg: css`
      font-size: 16px;
      padding: 7px 40px;
    `,
};

const buttonVariants = {
    primary: css`
      background-color: #007bff;
      color: white;
    `,
    secondary: css`
      background-color: #6c757d;
      color: white;
    `,
    success: css`
      background-color: #28a745;
      color: white;
    `,
    danger: css`
      background-color: #dc2626;
      color: white;
    `,
    warning: css`
      background-color: #ffc107;
      color: black;
    `,
    light: css`
      background-color: #f8f9fa;
      color: black;
    `,
    link: css`
      background-color: transparent;
      color: #007bff;
      text-decoration: underline;
      border: none;
    `,
};

const buttonOutlineVariants = {
    primary: css`
      background-color: transparent;
      color: #007bff;
      border: 1px solid #007bff;
    `,
    secondary: css`
      background-color: transparent;
      color: #6c757d;
      border: 1px solid #6c757d;
    `,
    success: css`
      background-color: transparent;
      color: #28a745;
      border: 1px solid #28a745;
    `,
    danger: css`
      background-color: transparent;
      color: #dc3545;
      border: 1px solid #dc3545;
    `,
    warning: css`
      background-color: transparent;
      color: #ffc107;
      border: 1px solid #ffc107;
    `,
    light: css`
      background-color: transparent;
      color: #f8f9fa;
      border: 1px solid #f8f9fa;
    `,
    link: css`
      background-color: transparent;
      color: #007bff;
      text-decoration: underline;
      border: none;
    `,
};

const shapeStyles = {
    none: () => css`
      border-radius: 0;
    `,
    shaped: (size) => {
        const radius = {
            sm: '4px',
            md: '6px',
            lg: '8px',
        };
        return css`
          border-radius: ${radius[size]};
        `;
    },
    rounded: () => css`
      border-radius: 9999px;
    `,
};
