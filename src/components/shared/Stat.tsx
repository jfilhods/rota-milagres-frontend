// src/components/shared/Stat.tsx
import React from "react";

interface StatProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

export function Stat({ icon, label, value }: StatProps) {
  return (
    <div className="rounded-2xl bg-card p-5 ring-1 ring-border">
      <div className="text-primary">{icon}</div>
      <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}