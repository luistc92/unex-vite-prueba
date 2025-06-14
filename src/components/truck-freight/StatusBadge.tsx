import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: string
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "in transit":
      return "bg-blue-500"
    case "loading":
      return "bg-purple-500"
    case "scheduled":
      return "bg-sky-500"
    case "delayed":
      return "bg-red-500"
    case "priority":
      return "bg-amber-500"
    case "delivered":
      return "bg-green-500"
    case "cancelled":
      return "bg-gray-500"
    default:
      return "bg-slate-500"
  }
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge className={cn("text-white text-xs", getStatusColor(status))}>
      {status}
    </Badge>
  )
}
