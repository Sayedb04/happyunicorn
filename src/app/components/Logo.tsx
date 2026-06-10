import logoSrc from "@/assets/happy-unicorn-logo.png";

interface LogoProps {
  className?: string;
  alt?: string;
}

export function Logo({ className = "h-8 w-auto", alt = "Happy Unicorn" }: LogoProps) {
  return <img src={logoSrc} alt={alt} className={className} />;
}
