import { CHURCH_LOGO_SVG } from "./church-logo-svg";

/** Animated gold medallion church logo (laurel wreath, cross, crown). */
export function ChurchLogo({ className = "" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="The Bangalore Bible Students logo"
      className={`inline-flex ${className}`}
      dangerouslySetInnerHTML={{ __html: CHURCH_LOGO_SVG }}
    />
  );
}
