"use client";

import { useRouter } from "next/navigation";
import React, { forwardRef } from "react";

export interface SafeLinkProps extends React.HTMLAttributes<HTMLSpanElement> {
  href: string;
  target?: string;
  rel?: string;
  children?: React.ReactNode;
}

const SafeLink = forwardRef<HTMLSpanElement, SafeLinkProps>(
  ({ href, target, rel, children, className, onClick, onKeyDown, ...props }, ref) => {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
      if (onClick) {
        onClick(e);
      }
      
      if (e.defaultPrevented) return;

      e.preventDefault();
      
      if (href.startsWith("http://") || href.startsWith("https://")) {
        if (target === "_blank") {
          window.open(href, "_blank", rel || "noopener,noreferrer");
        } else {
          window.location.href = href;
        }
      } else if (href.startsWith("tel:") || href.startsWith("mailto:")) {
        window.location.href = href;
      } else {
        router.push(href);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
      if (onKeyDown) {
        onKeyDown(e);
      }
      
      if (e.defaultPrevented) return;

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        
        if (href.startsWith("http://") || href.startsWith("https://")) {
          if (target === "_blank") {
            window.open(href, "_blank", rel || "noopener,noreferrer");
          } else {
            window.location.href = href;
          }
        } else if (href.startsWith("tel:") || href.startsWith("mailto:")) {
          window.location.href = href;
        } else {
          router.push(href);
        }
      }
    };

    return (
      <span
        ref={ref}
        role="link"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={className}
        style={{ cursor: "pointer" }}
        {...props}
      >
        {children}
      </span>
    );
  }
);

SafeLink.displayName = "SafeLink";

export default SafeLink;
