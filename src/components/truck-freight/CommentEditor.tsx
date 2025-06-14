import { Button } from "@/components/ui/button"
import { Pencil, Save, X } from "lucide-react"

interface CommentEditorProps {
  truckId: string
  comment: string
  isEditing: boolean
  editedComment: string
  onEditClick: (truckId: string, comment: string) => void
  onSave: (truckId: string) => void
  onCancel: () => void
  onCommentChange: (comment: string) => void
}

export function CommentEditor({
  truckId,
  comment,
  isEditing,
  editedComment,
  onEditClick,
  onSave,
  onCancel,
  onCommentChange,
}: CommentEditorProps) {
  if (isEditing) {
    return (
      <div className="py-2">
        <textarea
          value={editedComment}
          onChange={(e) => onCommentChange(e.target.value)}
          className="w-full p-2 border rounded-md text-sm min-h-[100px]"
          autoFocus
        />
        <div className="flex gap-2 mt-2 justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={onCancel}
            className="h-8 px-2 text-xs flex items-center"
          >
            <X className="h-3 w-3 mr-1" />
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={() => onSave(truckId)}
            className="h-8 px-2 text-xs flex items-center"
          >
            <Save className="h-3 w-3 mr-1" />
            Save
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-2 relative group">
      <p className="text-sm pr-8">{comment}</p>
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onEditClick(truckId, comment)}
      >
        <Pencil className="h-3 w-3" />
        <span className="sr-only">Edit comment</span>
      </Button>
    </div>
  )
}
