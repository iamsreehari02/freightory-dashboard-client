import { Badge } from "@/components/ui/badge";

export const getStatusBadge = (status: string | null | undefined) => {
  const normalized = status?.toLowerCase().trim();

  switch (normalized) {
    case "active":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Active
        </Badge>
      );
    case "suspended":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          Suspended
        </Badge>
      );
    case "inactive":
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
          Inactive
        </Badge>
      );
    case "available":
      return (
        <Badge className="bg-[#C7FAE6] text-green-600 hover:bg-[#C7FAE6]">
          Available
        </Badge>
      );
    case "unavailable":
      return (
        <Badge className="bg-[#FDE2E1] text-red-600 hover:bg-[#FDE2E1]">
          Unavailable
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Pending
        </Badge>
      );
    case "completed":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Completed
        </Badge>
      );
    case "failed":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          Failed
        </Badge>
      );
    case "rejected":
      return (
        <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
          Rejected
        </Badge>
      );
    case "deleted":
      return (
        <Badge className="bg-red-200 text-red-800 hover:bg-red-200">
          Deleted
        </Badge>
      );
    default:
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
          {status ?? "Unknown"}
        </Badge>
      );
  }
};

export const getRoleBadge = (role: string | null | undefined) => {
  const normalized = role?.toLowerCase().trim();

  switch (normalized) {
    case "admin":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          Admin
        </Badge>
      );
    case "freight_forwarder":
      return (
        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
          Freight Forwarder
        </Badge>
      );
    case "nvocc":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          NVOCC
        </Badge>
      );
    default:
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
          Unknown
        </Badge>
      );
  }
};
