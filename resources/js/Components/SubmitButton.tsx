import { ButtonHTMLAttributes } from 'react';

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    label: string;
}

export default function SubmitButton({
    className = '',
    label,
    ...props
}: SubmitButtonProps) {
    return (
        <button
            type="submit"
            className={`rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${className}`}
            {...props}
        >
            {label}
        </button>
    );
}
