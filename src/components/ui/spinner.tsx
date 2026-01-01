import { cn } from "@/lib/utils"
import { LoaderIcon } from "lucide-react"

import { cva, type VariantProps } from "class-variance-authority"

const spinnerVariants = cva(
  "animate-spin text-muted-foreground",
  {
    variants: {
      size: {
        default: "size-4",
        sm: "size-3",
        lg: "size-6",
        xl: "size-12",
        icon: "size-10",
      },
      variant: {
        default: "",
        primary: "text-primary",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

export interface SpinnerProps
  extends React.SVGProps<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {}

function Spinner({ className, size, variant, ...props }: SpinnerProps) {
  return (
    <LoaderIcon 
      className={cn(spinnerVariants({ size, variant }), className)} 
      {...props} 
    />
  )
}

function SpinnerContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("flex items-center justify-center p-8", className)} {...props}>
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 animate-pulse" />
            <Spinner size="icon" variant="primary" className="relative z-10" />
          </div>
        </div>
    )
}

export { Spinner, SpinnerContent }
