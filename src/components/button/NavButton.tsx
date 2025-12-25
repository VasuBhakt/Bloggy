import type { InputHTMLAttributes } from "react";
import Button from "./Button"

interface NavButtonProps extends InputHTMLAttributes<HTMLButtonElement> {
    label: string;
}

function NavButton({ label, ...props }: NavButtonProps) {
    return (
        <Button className="hover:scale-110 duration-200 shadow-[0_0_20px_rgba(163,230,53,0.3)]" textColor='text-lime-300' bgColor="bg-black" {...props}>
            {label}
        </Button>
    )
}

export default NavButton