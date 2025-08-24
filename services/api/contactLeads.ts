import { api } from "@/lib/api";
import { Contact } from "@/models/contactLead";

export const createContactLead = (data: {
  name: string;
  companyName?: string;
  email: string;
  phone?: string;
  message: string;
}) => {
  return api.post("/leads", data);
};
export async function getContactLeads(latest = false): Promise<Contact[]> {
  const res = await api.get<Contact[]>("/leads", {
    params: latest ? { latest: true } : {},
  });
  return res.data;
}

export const getContactLeadById = async (id: string): Promise<Contact> => {
  const res = await api.get<Contact>(`/leads/${id}`);
  return res.data;
};
