import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { statusOptions } from "@/data/statusOptions"
import { Freight } from "@/types/types"

interface FreightFormProps {
  freight: Freight
  onFieldChange: (field: keyof Freight, value: string) => void
  onSave: () => void
  onCancel: () => void
  isEditing?: boolean
  saveButtonText?: string
  idPrefix: string
}

export function FreightForm({
  freight,
  onFieldChange,
  onSave,
  onCancel,
  isEditing = true,
  saveButtonText = "Save Changes",
  idPrefix,
}: FreightFormProps) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor={`${idPrefix}-id`} className="text-xs">
            ID
          </Label>
          <Input
            id={`${idPrefix}-id`}
            value={freight.id}
            className="h-8 text-xs"
            disabled
          />
        </div>
        <div>
          <Label htmlFor={`${idPrefix}-status`} className="text-xs">
            Status
          </Label>
          <Select
            value={freight.status}
            onValueChange={(value) => onFieldChange("status", value)}
            disabled={!isEditing}
          >
            <SelectTrigger id={`${idPrefix}-status`} className="h-8 text-xs">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status} className="text-xs">
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-desc`} className="text-xs">
          Description*
        </Label>
        <Input
          id={`${idPrefix}-desc`}
          value={freight.description}
          onChange={(e) => onFieldChange("description", e.target.value)}
          className="h-8 text-xs"
          required
          disabled={!isEditing}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor={`${idPrefix}-weight`} className="text-xs">
            Weight*
          </Label>
          <Input
            id={`${idPrefix}-weight`}
            value={freight.weight}
            onChange={(e) => onFieldChange("weight", e.target.value)}
            className="h-8 text-xs"
            placeholder="e.g. 5 tons"
            required
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor={`${idPrefix}-dest`} className="text-xs">
            Destination*
          </Label>
          <Input
            id={`${idPrefix}-dest`}
            value={freight.destination}
            onChange={(e) => onFieldChange("destination", e.target.value)}
            className="h-8 text-xs"
            required
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-2">
        <Button
          size="sm"
          variant="outline"
          onClick={onCancel}
          className="h-7 px-2 text-xs"
        >
          Cancel
        </Button>
        <Button size="sm" onClick={onSave} className="h-7 px-2 text-xs">
          {saveButtonText}
        </Button>
      </div>
    </div>
  )
}
