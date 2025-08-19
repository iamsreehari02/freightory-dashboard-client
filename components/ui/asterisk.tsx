import React from "react";

interface AsteriskProps {
  className?: string;
}

export const Asterisk: React.FC<AsteriskProps> = ({ className }) => {
  return (
    <span className={`text-red-500  ${className || ""}`} aria-hidden="true">
      *
    </span>
  );
};
