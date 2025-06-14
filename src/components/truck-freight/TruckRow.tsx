import { TableCell, TableRow } from "@/components/ui/table"
import { Truck, Freight, EditingFreight } from "@/types/types"
import { FreightList } from "./FreightList"
import { CommentEditor } from "./CommentEditor"

interface TruckRowProps {
  truck: Truck
  editingId: string | null
  editedComment: string
  expandedFreightId: string | null
  editingFreight: EditingFreight | null
  addingFreightToTruck: string | null
  newFreight: Freight
  onEditClick: (truckId: string, comment: string) => void
  onSaveComment: (truckId: string) => void
  onCancelEdit: () => void
  onCommentChange: (comment: string) => void
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

export function TruckRow({
  truck,
  editingId,
  editedComment,
  expandedFreightId,
  editingFreight,
  addingFreightToTruck,
  newFreight,
  onEditClick,
  onSaveComment,
  onCancelEdit,
  onCommentChange,
  onFreightCardClick,
  onEditFreightInputChange,
  onSaveEditedFreight,
  onCancelEditFreight,
  onAddFreightClick,
  onFreightInputChange,
  onSaveNewFreight,
  onCancelAddFreight,
  activeCardRef,
}: TruckRowProps) {
  return (
    <TableRow className="align-top">
      <TableCell className="font-medium">
        <div className="py-2">
          <div className="font-bold">{truck.name}</div>
          <div className="text-sm text-muted-foreground">{truck.id}</div>
        </div>
      </TableCell>
      <TableCell>
        <FreightList
          truckId={truck.id}
          freights={truck.freights}
          expandedFreightId={expandedFreightId}
          editingFreight={editingFreight}
          addingFreightToTruck={addingFreightToTruck}
          newFreight={newFreight}
          onFreightCardClick={onFreightCardClick}
          onEditFreightInputChange={onEditFreightInputChange}
          onSaveEditedFreight={onSaveEditedFreight}
          onCancelEditFreight={onCancelEditFreight}
          onAddFreightClick={onAddFreightClick}
          onFreightInputChange={onFreightInputChange}
          onSaveNewFreight={onSaveNewFreight}
          onCancelAddFreight={onCancelAddFreight}
          activeCardRef={activeCardRef}
        />
      </TableCell>
      <TableCell>
        <CommentEditor
          truckId={truck.id}
          comment={truck.comments}
          isEditing={editingId === truck.id}
          editedComment={editedComment}
          onEditClick={onEditClick}
          onSave={onSaveComment}
          onCancel={onCancelEdit}
          onCommentChange={onCommentChange}
        />
      </TableCell>
    </TableRow>
  )
}
