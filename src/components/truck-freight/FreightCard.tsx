import { useRef } from "react"
import { Package } from "lucide-react"
import { cn } from "@/lib/utils"
import { Freight } from "@/types/types"
import { StatusBadge } from "./StatusBadge"
import { FreightForm } from "./FreightForm"

interface FreightCardProps {
  freight: Freight
  truckId: string
  isExpanded: boolean
  isEditing: boolean
  editingFreight: Freight | null
  onCardClick: (truckId: string, freight: Freight) => void
  onFieldChange: (field: keyof Freight, value: string) => void
  onSave: () => void
  onCancel: () => void
  activeCardRef?: React.RefObject<HTMLDivElement>
}

export function FreightCard({
  freight,
  truckId,
  isExpanded,
  isEditing,
  editingFreight,
  onCardClick,
  onFieldChange,
  onSave,
  onCancel,
  activeCardRef,
}: FreightCardProps) {
  const localRef = useRef<HTMLDivElement>(null)
  const cardRef = isExpanded ? activeCardRef || localRef : null

  return (
    <div
      ref={cardRef}
      className={cn(
        "rounded-md border bg-background shadow-sm w-full freight-card",
        isExpanded && "editing",
      )}
    >
      {/* Header - Always visible */}
      <div
        className={cn(
          "p-2 hover:bg-muted/30 cursor-pointer transition-colors",
          isExpanded && "bg-muted/30",
        )}
        onClick={() => onCardClick(truckId, freight)}
        role="button"
        tabIndex={0}
        aria-label={`${isExpanded ? "Collapse" : "Expand"} freight ${freight.id} details`}
        aria-expanded={isExpanded}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onCardClick(truckId, freight)
          }
        }}
      >
        <div className="flex justify-between items-center">
          <span className="font-medium text-sm flex items-center">
            <Package className="mr-1 h-3 w-3" />
            {freight.id}
          </span>
          <StatusBadge status={freight.status} />
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          {freight.description} • {freight.weight} • To: {freight.destination}
        </div>
      </div>

      {/* Edit Form - Expands/collapses */}
      <div className={cn("freight-edit-form px-3", isExpanded && "open")}>
        <div className="border-t pt-3 mt-1">
          <FreightForm
            freight={editingFreight || freight}
            onFieldChange={onFieldChange}
            onSave={onSave}
            onCancel={onCancel}
            isEditing={isEditing}
            saveButtonText="Save Changes"
            idPrefix={`edit-freight-${freight.id}`}
          />
        </div>
      </div>
    </div>
  )
}
