"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";

interface AppDropdownProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  error?: string;
}

export const AppDropdown = ({
  label,
  placeholder = "Select an option",
  value,
  onChange,
  options,
  error,
}: AppDropdownProps) => {
  return (
    <div className="w-full space-y-2">
      {label && <Label>{label}</Label>}
      <Select onValueChange={onChange} defaultValue={value}>
        <FormControl>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};
