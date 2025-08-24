import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Hash,
  Calendar,
  Package,
  Building,
  MapPin,
  DollarSign,
  User,
} from "lucide-react";
import { DetailRow } from "../ui/detail-row";
import { Container, getContainerTypeLabel } from "@/models/container";
import { getStatusBadge } from "@/lib/getBadge";
import { formatDate } from "@/lib/utils";

type Props = {
  container: Container;
};

export function ContainerInfoCard({ container }: Props) {
  return (
    <Card size="xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base text-foreground -mb-4">
          Container Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <DetailRow
          icon={Hash}
          label="Container ID"
          value={container.containerId}
          className="font-bold"
        />
        <DetailRow
          icon={Hash}
          label="Status"
          value={getStatusBadge(container.status)}
        />
        <DetailRow
          icon={MapPin}
          label="Port"
          value={
            typeof container.port === "string"
              ? container.port
              : container.port?.name ?? "—"
          }
        />
        <DetailRow
          icon={MapPin}
          label="Country"
          value={
            typeof container.port === "object"
              ? container.port?.country
              : container.country
          }
        />
        <DetailRow
          icon={Package}
          label="Units Available"
          value={container.unitsAvailable.toString()}
        />
        <DetailRow
          icon={Calendar}
          label="Available From"
          value={formatDate(container.availableFrom)}
        />
        {container.specialRate && (
          <DetailRow
            icon={DollarSign}
            label="Special Rate"
            value={`$${container.specialRate}`}
          />
        )}
        {container.agentDetails && (
          <DetailRow
            icon={User}
            label="Agent Details"
            value={container.agentDetails}
          />
        )}
        <DetailRow
          icon={Calendar}
          label="Created At"
          value={formatDate(container.createdAt)}
        />
        <DetailRow
          icon={Calendar}
          label="Updated At"
          value={formatDate(container.updatedAt)}
        />
      </CardContent>
    </Card>
  );
}
