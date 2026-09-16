// components/DashboardLink.tsx
import { Link } from "@tanstack/react-router";
import { ComponentProps } from "react";

interface DashboardLinkProps {
  to: NonNullable<ComponentProps<typeof Link>["to"]>;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export function DashboardLink({
  to,
  onClick,
  className,
  children,
}: DashboardLinkProps) {
  return (
    <Link to={to} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}