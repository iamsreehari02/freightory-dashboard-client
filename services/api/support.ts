import { api } from "@/lib/api";

export const submitSupportRequest = (data: { subject: string; feedback: string }) => {
  return api.post("/support", {
    type: data.subject, 
    message: data.feedback,
  });
};

export const adminSupportRequest = async ({
  subject,
  description,
}: {
  subject: string;
  description: string;
}) => {
  const res = await api.post("/support/admin", {
    subject,
    description,
  });
  return res.data;
};
