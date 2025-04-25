import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import Link from "next/link"
import { useTheme } from "next-themes"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 transition-all",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary/80",
        secondary: "bg-secondary text-white hover:bg-secondary/80",
        ghost:
          "bg-transparent border-2 border-primary text-primary hover:bg-primary/10",
      },
      size: {
        small: "px-4 py-2 text-sm",
        medium: "px-6 py-3 text-base",
        large: "px-8 py-4 text-lg",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
      fullWidth: false,
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, fullWidth, className, children, href, ...props }, ref) => {
    const { theme } = useTheme()
    const baseClasses = `${buttonVariants({ variant, size, fullWidth })} ${
      theme === "dark" ? "text-white" : "text-gray-900"
    } ${className}`

    if (href) {
      return (
        <Link href={href} className={baseClasses}>
          {children}
        </Link>
      )
    }

    return (
      <button className={baseClasses} ref={ref} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export default Button
