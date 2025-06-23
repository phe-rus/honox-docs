import { ReactNode } from "react";
import { cn } from "../../islands/utils";

type Props = {
  href: string;
  children: ReactNode;
  /**
   * If true, the link will open in a new tab
   * @default false
   */
  external?: boolean;
  /**
   * If true, the link will not change style when visited
   * @default false
   */
  noVisitedStyle?: boolean;
  /**
   * If true, the link will not have an underline
   * @default false
   */
  noUnderline?: boolean;
  /**
   * The scroll behavior when navigating to the link
   * @default true
   */
  scroll?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Link({
  href,
  children,
  className,
  external = false,
  noVisitedStyle = false,
  noUnderline = true,
  scroll = true,
  ...rest
}: Props) {
  // Determine if the link is internal (starts with /) or external
  const isInternal = !external && href.startsWith("/");

  // Default base styles
  const baseStyles = cn(
    "flex items-center text-current transition-colors hover:text-blue-600 focus:text-blue-600",
    {
      "underline underline-offset-4": !noUnderline,
      "visited:text-inherit": noVisitedStyle,
    }
  );

  // Handle external links
  if (!isInternal || external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseStyles, className)}
        {...rest}
      >
        {children}
      </a>
    );
  }

  // Internal link handling (simulating Next.js behavior)
  return (
    <a
      href={href}
      className={cn(baseStyles, className)}
      {...(scroll === false && { "data-scroll": "false" })}
      {...rest}
    >
      {children}
    </a>
  );
}