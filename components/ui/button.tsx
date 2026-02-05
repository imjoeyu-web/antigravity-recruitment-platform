import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
}

export function Button({ className, variant = 'primary', size = 'md', ...props }: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        outline: "border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900",
        ghost: "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
    }

    const sizes = {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-4 py-2",
        lg: "h-11 px-8 text-md",
    }

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ''}`

    return (
        <button className={classes} {...props} />
    )
}
