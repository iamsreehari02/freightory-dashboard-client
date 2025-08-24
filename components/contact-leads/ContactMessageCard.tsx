"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AppButton } from "@/components/shared/AppButton";
import { toast } from "sonner";

type Props = {
  message?: string;
};

export function ContactMessageReplyCard({ message }: Props) {
  const handleSendReply = async () => {
    toast.success("Reply sent successfully!");
  };

  return (
    <Card className="max-w-none">
      <CardHeader>
        <CardTitle className="text-base">Message</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Message */}
        <div className="bg-muted rounded-md p-3 text-sm text-foreground whitespace-pre-line">
          {message || "—"}
        </div>

        {/* Reply */}
        {/* <div className="space-y-3">
          <Textarea
            placeholder="Write your reply here..."
            className="min-h-[120px] resize-none"
          />
          <AppButton onClick={handleSendReply} className="w-full">
            Send Reply
          </AppButton>
        </div> */}
      </CardContent>
    </Card>
  );
}
