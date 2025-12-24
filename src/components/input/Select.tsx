import React, { useId } from 'react'

interface SelectProps {
    options?: string[];
    label?: string;
    className: string;
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
            {label && <label htmlFor={id} className=''></label>}
            <select {...props} id={id} ref={ref} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-blue-100 duration-200 border border-blue-950 w-full ${className}`}>
                {options?.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select);