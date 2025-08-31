export type Company = {
  _id: string;
  name: string;
  contactPerson: string;
  companyName: string;
  website: string;
  headOfficeAddress: string;
  country: string;
  pinCode: string;
  freightType: "freight_forwarder" | "nvocc";
  costPerBranch: number;
  branchCount: number;
  baseRegistrationFee?: number;
  totalRegistrationCost?: number;
  currencyCode: string;
  currency: string;
};

export const getCompanyDisplayName = (company: Company | null) =>
  company?.name || "—";

export const getCompanyAddress = (company: Company | null) => {
  if (!company) return "—";
  return `${company.headOfficeAddress}, ${company.country} - ${company.pinCode}`;
};

export const getFreightTypeLabel = (freightType: Company["freightType"]) => {
  switch (freightType) {
    case "freight_forwarder":
      return "Freight Forwarder";
    case "nvocc":
      return "NVOCC";
    default:
      return "Unknown";
  }
};
