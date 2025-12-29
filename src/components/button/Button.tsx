// Reusable Button component with Framer Motion animations
import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
    children?: React.ReactNode;
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
    whileHover = { scale: 1.02 },
    whileTap = { scale: 0.98 },
    transition = { type: "spring", stiffness: 400, damping: 10 },
    ...props
}: ButtonProps) {

    return (
        <motion.button
            type={type as any}
            whileHover={whileHover}
            whileTap={whileTap}
            transition={transition}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${className} ${bgColor} ${textColor}`}
            {...props}
        >
            {children}
        </motion.button>
    )
}

export default Button