import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Freight } from "@/types/types"
import { FreightForm } from "./FreightForm"

interface AddFreightCardProps {
  truckId: string
  newFreight: Freight
  isAdding: boolean
  onAddClick: (truckId: string) => void
  onFieldChange: (field: keyof Freight, value: string) => void
  onSave: () => void
  onCancel: () => void
}

export function AddFreightCard({
  truckId,
  newFreight,
  isAdding,
  onAddClick,
  onFieldChange,
  onSave,
  onCancel,
}: AddFreightCardProps) {
  return (
    <div
      className={cn(
        "rounded-md border bg-background shadow-sm w-full freight-card",
        isAdding && "adding",
      )}
    >
      {/* Header - Always visible */}
      <div
        className={cn(
          "p-2 hover:bg-muted/30 cursor-pointer transition-colors",
          isAdding && "bg-muted/30",
        )}
        onClick={() => onAddClick(truckId)}
        role="button"
        tabIndex={0}
        aria-label="Add new freight"
        aria-expanded={isAdding}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onAddClick(truckId)
          }
        }}
      >
        <div className="flex justify-between items-center">
          <span className="font-medium text-sm flex items-center">
            <Plus className="mr-1 h-3 w-3" />
            Add New Freight
          </span>
        </div>
      </div>

      {/* Add Form - Expands/collapses */}
      <div className={cn("freight-edit-form px-3", isAdding && "open")}>
        <div className="border-t pt-3 mt-1">
          <FreightForm
            freight={newFreight}
            onFieldChange={onFieldChange}
            onSave={onSave}
            onCancel={onCancel}
            isEditing={true}
            saveButtonText="Add Freight"
            idPrefix={`freight-${truckId}`}
          />
        </div>
      </div>
    </div>
  )
}
