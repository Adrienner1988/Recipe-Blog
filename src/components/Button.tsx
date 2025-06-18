
import React from "react";


type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    className?: string;
    disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    type = "button",
    disabled = false,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={(
                "px-4 py-2 rounded-lg font-semibold transition-colors bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            )}
        >
            {children}
        </button>
    );
};

export default Button;
