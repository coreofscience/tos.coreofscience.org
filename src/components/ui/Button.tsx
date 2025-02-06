import cn from "../../utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-medium transition-colors ease-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        leaf: "bg-leaf font-tall text-slate-50 hover:opacity-90 disabled:bg-slate-600",
        trunk:
          "bg-trunk font-tall text-slate-50 hover:opacity-90 disabled:bg-slate-600",
        branch:
          "bg-branch font-tall text-slate-50 hover:opacity-90 disabled:bg-slate-600",
        root: "bg-root font-tall text-slate-50 hover:opacity-90 disabled:bg-slate-600",
        outline:
          "border font-tall border-leaf text-leaf bg-slate-50 hover:bg-slate-200",
        link: "text-sky-600 hover:text-sky-800 active:text-sky-800 underline-offset-4 hover:underline",
        leafyLink:
          "text-leaf-600 hover:text-leaf-800 active:text-leaf-800 underline-offset-4 hover:underline",
      },
      size: {
        default: "px-4 py-2",
        big: "text-xl px-6 py-2",
        huge: "text-4xl px-8 py-4",
        link: "",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "leaf",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export default Button;
