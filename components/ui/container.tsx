import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`p-4 bg-white rounded-lg space-y-4 ${className}`}>
      {children}
    </div>
  );
};

export default PageContainer;
