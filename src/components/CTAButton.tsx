import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface CTAButtonProps {
  to: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  showArrow?: boolean;
  onClick?: () => void;
  external?: boolean;
}

const CTAButton = ({
  to,
  children,
  variant = "primary",
  size = "md",
  className,
  showArrow = false,
  onClick,
  external = false,
}: CTAButtonProps) => {
  const base =
    "inline-flex items-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md hover:-translate-y-px active:translate-y-0",
    secondary:
      "border border-border text-foreground bg-background hover:bg-accent hover:text-accent-foreground",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={onClick}
      >
        {children}
        {showArrow && <ArrowRight size={15} className="opacity-70" />}
      </a>
    );
  }

  return (
    <Link to={to} className={classes} onClick={onClick}>
      {children}
      {showArrow && <ArrowRight size={15} className="opacity-70" />}
    </Link>
  );
};

export default CTAButton;
