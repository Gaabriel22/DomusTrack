import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { useTheme } from "next-themes"

// Definindo variantes com o cva
const inputVariants = cva(
  "block w-full rounded-md px-4 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all",
  {
    variants: {
      variant: {
        primary: "border-primary text-primary focus:ring-primary",
        secondary: "border-secondary text-secondary focus:ring-secondary",
        outline: "border-gray-300 text-gray-900 focus:ring-gray-500",
      },
      size: {
        small: "px-3 py-2 text-sm",
        medium: "px-4 py-2 text-base",
        large: "px-5 py-3 text-lg",
      },
      disabled: {
        true: "bg-gray-100 border-gray-300 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
      disabled: false,
    },
  }
)

interface InputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "disabled"
    >,
    VariantProps<typeof inputVariants> {
  disabled?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant, size, disabled = false, className, ...props }, ref) => {
    const { theme } = useTheme()

    return (
      <input
        className={`${inputVariants({
          variant,
          size,
          disabled,
        })} ${theme === "dark" ? "text-white" : "text-gray-900"} ${className}`}
        ref={ref}
        disabled={disabled}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export default Input
