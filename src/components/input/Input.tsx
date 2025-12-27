import React, { useId, type InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    type?: string;
    className?: string;
}
const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}: InputProps, ref: React.Ref<HTMLInputElement>) {

    const id = useId();
    return (
        <div className="w-full">
            {label && <label className="inline-block mb-2 pl-1 font-medium text-gray-700 text-sm" htmlFor={id}>{label}</label>}
            <input
                type={type}
                className={`w-full px-4 py-3 rounded-xl bg-white text-gray-900 outline-none border border-gray-200 focus:border-lime-400 focus:ring-4 focus:ring-lime-400/20 transition-all duration-200 ease-in-out placeholder:text-gray-400 ${className}`}
                {...props}
                ref={ref}
                id={id}
            />
        </div>
    )
})

export default Input