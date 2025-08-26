"use client";

import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

export default function AgentDetailsField({ form }: { form: any }) {
  const placeholders = ["Name", "Contact", "Email", "Address"];
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [cursorPosition, setCursorPosition] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      const textarea = e.currentTarget;
      const { value, selectionStart } = textarea;
      const lines = value.split("\n");

      // Don't allow more than 4 lines
      if (lines.length >= placeholders.length) {
        e.preventDefault();
        return;
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const lines = value.split("\n");

    // Limit to max 4 lines
    if (lines.length > placeholders.length) {
      const limitedLines = lines.slice(0, placeholders.length);
      const limitedValue = limitedLines.join("\n");

      // Update the form value
      form.setValue("agentDetails", limitedValue);

      // Set cursor to end of last allowed line
      setTimeout(() => {
        if (textareaRef.current) {
          const newPosition = limitedValue.length;
          textareaRef.current.setSelectionRange(newPosition, newPosition);
        }
      }, 0);

      return;
    }

    form.setValue("agentDetails", value);
  };

  const handleCursorChange = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    setCursorPosition(textarea.selectionStart);
  };

  const renderPlaceholderOverlay = (value: string) => {
    const lines = value.split("\n");

    return (
      <div className="absolute top-3 left-3 pointer-events-none text-muted-foreground/50 text-sm whitespace-pre-wrap">
        {placeholders.map((placeholder, index) => {
          const lineValue = lines[index] || "";
          const showPlaceholder = lineValue.trim() === "";

          return (
            <div
              key={index}
              style={{
                height: "1.75rem",
                lineHeight: "1.75rem",
              }}
            >
              {showPlaceholder ? placeholder : ""}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <FormField
      control={form.control}
      name="agentDetails"
      render={({ field }) => (
        <FormItem className="col-span-2">
          <FormLabel>Agent Details</FormLabel>
          <FormControl>
            <div className="relative">
              {renderPlaceholderOverlay(field.value || "")}
              <Textarea
                {...field}
                ref={textareaRef}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                onSelect={handleCursorChange}
                onClick={handleCursorChange}
                onKeyUp={handleCursorChange}
                rows={6}
                className="resize-none font-medium relative bg-transparent min-h-[8rem]"
                style={{ lineHeight: "1.75rem" }}
                placeholder=""
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
