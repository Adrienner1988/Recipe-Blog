interface ButtonProps {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "outline";
    className?: string;
}

const Button = ({
    children,
    onClick,
    type = "button",
    variant = "primary",
    className = "",
}: ButtonProps) => {
    const variants = {
        primary: "btn-primary",
        secondary: "btn-secondary",
        outline: "btn-outline",
    };

    return (
        <button
        type={type}
        onClick={onClick} 
        className={`${variants[variant]} ${className}`}>
        {children}
        </button>
    );
};

export default Button;

