import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface CTAButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  showArrow?: boolean;
  onClick?: () => void;
  external?: boolean;
}

const CTAButton = ({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  showArrow = false,
  onClick,
  external = false,
}: CTAButtonProps) => {
  const base =
    "inline-flex items-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/85 shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30 hover:-translate-y-px active:translate-y-0",
    secondary:
      "border border-border text-foreground bg-card hover:bg-accent hover:text-accent-foreground",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick}>
        {children}
        {showArrow && <ArrowRight size={15} className="opacity-70" />}
      </a>
    );
  }

  return (
    <a href={href} className={classes} onClick={onClick}>
      {children}
      {showArrow && <ArrowRight size={15} className="opacity-70" />}
    </a>
  );
};

export default CTAButton;
