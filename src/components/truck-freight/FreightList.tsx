import { Freight, EditingFreight } from "@/types/types"
import { FreightCard } from "./FreightCard"
import { AddFreightCard } from "./AddFreightCard"

interface FreightListProps {
  truckId: string
  freights: Freight[]
  expandedFreightId: string | null
  editingFreight: EditingFreight | null
  addingFreightToTruck: string | null
  newFreight: Freight
  onFreightCardClick: (truckId: string, freight: Freight) => void
  onEditFreightInputChange: (field: keyof Freight, value: string) => void
  onSaveEditedFreight: () => void
  onCancelEditFreight: () => void
  onAddFreightClick: (truckId: string) => void
  onFreightInputChange: (field: keyof Freight, value: string) => void
  onSaveNewFreight: () => void
  onCancelAddFreight: () => void
  activeCardRef?: React.RefObject<HTMLDivElement>
}

export function FreightList({
  truckId,
  freights,
  expandedFreightId,
  editingFreight,
  addingFreightToTruck,
  newFreight,
  onFreightCardClick,
  onEditFreightInputChange,
  onSaveEditedFreight,
  onCancelEditFreight,
  onAddFreightClick,
  onFreightInputChange,
  onSaveNewFreight,
  onCancelAddFreight,
  activeCardRef,
}: FreightListProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="space-y-2 py-2 w-full max-w-md">
        {freights.length > 0 ? (
          freights.map((freight) => {
            const isExpanded = expandedFreightId === freight.id
            const isEditing = editingFreight?.freightId === freight.id

            return (
              <FreightCard
                key={freight.id}
                freight={freight}
                truckId={truckId}
                isExpanded={isExpanded}
                isEditing={isEditing}
                editingFreight={editingFreight?.data || null}
                onCardClick={onFreightCardClick}
                onFieldChange={onEditFreightInputChange}
                onSave={onSaveEditedFreight}
                onCancel={onCancelEditFreight}
                activeCardRef={isExpanded ? activeCardRef : undefined}
              />
            )
          })
        ) : (
          <div className="py-2 text-muted-foreground italic text-sm">No freight assigned</div>
        )}

        {/* Add New Freight Card */}
        <AddFreightCard
          truckId={truckId}
          newFreight={newFreight}
          isAdding={addingFreightToTruck === truckId}
          onAddClick={onAddFreightClick}
          onFieldChange={onFreightInputChange}
          onSave={onSaveNewFreight}
          onCancel={onCancelAddFreight}
        />
      </div>
    </div>
  )
}
