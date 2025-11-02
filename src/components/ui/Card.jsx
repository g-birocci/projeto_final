import React from "react";

export function Card({ children, className }) {
  return (
    <div className={`bg-white dark:bg-gray-800 overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return <div className={`p-1 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className }) {
  return <h3 className={`text-sm font-bold ${className}`}>{children}</h3>;
}

export function CardContent({ children, className }) {
  return <div className={`p-1 ${className}`}>{children}</div>;
}
