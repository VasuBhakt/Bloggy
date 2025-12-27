import React, { useId } from 'react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options?: string[];
    label?: string;
    className?: string;
}

function Select({
    options,
    label,
    className = "",
    ...props
}: SelectProps, ref: React.Ref<HTMLSelectElement>) {
    const id = useId();

    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className='inline-block mb-2 pl-1 font-medium text-gray-700 text-sm'>{label}</label>}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`w-full px-4 py-3 rounded-xl bg-white text-gray-900 outline-none border border-gray-200 focus:border-lime-400 focus:ring-4 focus:ring-lime-400/20 transition-all duration-200 ease-in-out appearance-none cursor-pointer ${className}`}
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: `right 1rem center`,
                    backgroundRepeat: `no-repeat`,
                    backgroundSize: `1.5em 1.5em`,
                    paddingRight: `2.5rem`
                }}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select);