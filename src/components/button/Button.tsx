// Reusable Button component

import type { InputHTMLAttributes } from "react";

interface ButtonProps extends InputHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    type?: string;
    bgColor?: string;
    textColor?: string;
    className?: string;
}

function Button({
    children,
    type = "button",
    bgColor = "bg-black",
    textColor = "text-lime-300",
    className = "",
    ...props }:
    ButtonProps) {

    return (
        <button className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`} {...props}>
            {children}
        </button>
    )
}

export default Button