export type Contact = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  message: string;
  createdAt: string;
};

export const getContactDisplayName = (contact: Contact | null) =>
  contact?.name || "—";

export const getContactCompany = (contact: Contact | null) =>
  contact?.companyName || "—";

export const getContactEmail = (contact: Contact | null) =>
  contact?.email || "—";

export const getContactPhone = (contact: Contact | null) =>
  contact?.phone || "—";

export const getContactMessageSnippet = (contact: Contact | null, length = 50) =>
  contact?.message
    ? contact.message.length > length
      ? contact.message.substring(0, length) + "..."
      : contact.message
    : "—";
