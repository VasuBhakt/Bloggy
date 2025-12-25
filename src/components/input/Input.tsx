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
        <>
            <div className="w-full">
                {label && <label className="inline-block mb-1 pl-1" htmlFor={id}>{label}</label>}
                <input type={type} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-lime-100 duration-200 border border-green-950 w-full ${className}`} {...props} ref={ref} id={id} />
            </div>
        </>
    )
})

export default Input