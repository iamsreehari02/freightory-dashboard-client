"use client";

import { ReactNode } from "react";
import TextP from "./typography/TextP";

type PageHeaderProps = {
  title: string;
  rightContent?: ReactNode;
};

export default function PageHeader({ title, rightContent }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <TextP className="font-bold font-clash">{title}</TextP>
      <div>{rightContent}</div>
    </div>
  );
}
