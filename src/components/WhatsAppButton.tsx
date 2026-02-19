import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { WHATSAPP_URL } from "@/config";

interface WhatsAppButtonProps {
  className?: string;
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  label?: string;
}

const WhatsAppButton = ({
  className,
  variant = "outline",
  size = "md",
  label = "Falar no WhatsApp",
}: WhatsAppButtonProps) => {
  const base =
    "inline-flex items-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const variants = {
    primary: "bg-[hsl(142,69%,35%)] text-white hover:bg-[hsl(142,69%,30%)] shadow-sm hover:shadow-md hover:-translate-y-px",
    outline: "border border-border text-foreground bg-card hover:bg-accent/60",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(base, variants[variant], sizes[size], className)}
      aria-label="Contato pelo WhatsApp"
    >
      <MessageCircle size={16} className="shrink-0" />
      {label}
    </a>
  );
};

export default WhatsAppButton;
