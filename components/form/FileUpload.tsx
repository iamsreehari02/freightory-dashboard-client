"use client";

import React, { useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";

interface FileUploadProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  accept?: string;
  disabled?: boolean;
}

export default function FileUpload<T extends FieldValues>({
  control,
  name,
  label = "Upload file (optional)",
  accept = ".png,.jpg,.jpeg,.log,.txt,.pdf",
  disabled = false,
}: FileUploadProps<T>) {
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files;
          field.onChange(files);
          if (files && files.length > 0) {
            setFileName(files[0].name);
          } else {
            setFileName(null);
          }
        };

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <>
                <input
                  type="file"
                  accept={accept}
                  id={`file-upload-${name}`}
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={disabled}
                />
                <label
                  htmlFor={`file-upload-${name}`}
                  className={`
                    block w-full rounded-sm border border-input px-3 py-2 text-sm
                    cursor-pointer bg-background
                    ${disabled ? "cursor-not-allowed opacity-50" : ""}
                    select-none 
                  `}
                  tabIndex={0}
                  onKeyDown={e => {
                    // Support keyboard "Enter" or "Space" to open file dialog
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      document.getElementById(`file-upload-${name}`)?.click();
                    }
                  }}
                >
                  {fileName ?? "Choose file..."}
                </label>
              </>
            </FormControl>
            <FormMessage>{fieldState.error?.message}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
}
