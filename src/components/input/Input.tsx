import React, { useId, useState, type InputHTMLAttributes } from "react"

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
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const isPasswordType = type === "password";
    const currentInputType = isPasswordType ? (showPassword ? "text" : "password") : type;

    return (
        <div className="w-full">
            {label && (
                <label className="inline-block mb-2 pl-1 font-medium text-gray-700 text-sm" htmlFor={id}>
                    {label}
                </label>
            )}
            <div className="relative group">
                <input
                    type={currentInputType}
                    className={`w-full px-4 py-3 rounded-xl bg-white text-gray-900 outline-none border border-gray-200 focus:border-lime-400 focus:ring-4 focus:ring-lime-400/20 transition-all duration-200 ease-in-out placeholder:text-gray-400 ${isPasswordType ? "pr-12" : ""} ${className}`}
                    {...props}
                    ref={ref}
                    id={id}
                />

                {isPasswordType && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-lime-600 transition-colors focus:outline-none"
                    >
                        {showPassword ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </button>
                )}
            </div>
        </div>
    )
})

export default Input