// // components/members/CompanyInfoCard.tsx
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Building2, Contact, Mail, Phone, Globe } from "lucide-react";
// import { Member } from "@/store/useMemberStore";
// import { DetailRow } from "./DetailRow";
// import { getCompanyDisplayName } from "@/lib/utils";

// type Props = {
//   member: Member;
// };

// export function CompanyInfoCard({ member }: Props) {
//   const company = member.company;

//   if (!company) return null;

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2 text-base text-foreground">
//           <Building2 className="h-4 w-4" />
//           Company Information
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-1">
//         <DetailRow
//           icon={Building2}
//           label="Company Name"
//           value={getCompanyDisplayName(member)}
//           valueClassName="font-medium"
//         />
//         <DetailRow
//           icon={Contact}
//           label="Contact Person"
//           value={company.contactPerson}
//         />
//         <DetailRow icon={Mail} label="Company Email" value={member.email} />
//         <DetailRow icon={Phone} label="Company Phone" value={member.phone} />
//         <DetailRow icon={Globe} label="Country" value={company.country} />
//       </CardContent>
//     </Card>
//   );
// }
