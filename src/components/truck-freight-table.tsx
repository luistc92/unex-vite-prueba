"use client"

import { useState, useRef, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Package, Pencil, Plus, Save, X } from "lucide-react"

// Sample data
const initialTrucks = [
  {
    id: "TRK-001",
    name: "Volvo FH16",
    comments: "Regular maintenance scheduled for next week. Driver reported minor brake noise.",
    freights: [
      { id: "FRT-101", description: "Electronics", weight: "5 tons", destination: "New York", status: "In Transit" },
      { id: "FRT-102", description: "Furniture", weight: "8 tons", destination: "Chicago", status: "Loading" },
      { id: "FRT-103", description: "Clothing", weight: "3 tons", destination: "Boston", status: "Scheduled" },
    ],
  },
  {
    id: "TRK-002",
    name: "Mercedes-Benz Actros",
    comments: "Tire replacement needed. Fuel efficiency decreased by 5% this month.",
    freights: [
      { id: "FRT-201", description: "Auto Parts", weight: "7 tons", destination: "Detroit", status: "Delayed" },
      {
        id: "FRT-202",
        description: "Construction Materials",
        weight: "12 tons",
        destination: "Seattle",
        status: "Scheduled",
      },
    ],
  },
  {
    id: "TRK-003",
    name: "Kenworth W990",
    comments: "New driver assigned. GPS system updated to latest version.",
    freights: [
      { id: "FRT-301", description: "Food Products", weight: "6 tons", destination: "Miami", status: "In Transit" },
      { id: "FRT-302", description: "Medical Supplies", weight: "2 tons", destination: "Atlanta", status: "Priority" },
      { id: "FRT-303", description: "Paper Goods", weight: "4 tons", destination: "Dallas", status: "Loading" },
      { id: "FRT-304", description: "Machinery", weight: "10 tons", destination: "Houston", status: "Scheduled" },
    ],
  },
  {
    id: "TRK-004",
    name: "Peterbilt 579",
    comments: "Currently in shop for major overhaul. Expected back in service by end of month.",
    freights: [],
  },
  {
    id: "TRK-005",
    name: "Scania R730",
    comments: "New route assignment pending. Driver requested time off next month.",
    freights: [
      { id: "FRT-501", description: "Chemicals", weight: "8 tons", destination: "Denver", status: "In Transit" },
      { id: "FRT-502", description: "Textiles", weight: "5 tons", destination: "Phoenix", status: "Loading" },
    ],
  },
]

// Available status options
const statusOptions = ["In Transit", "Loading", "Scheduled", "Delayed", "Priority", "Delivered", "Cancelled"]

type Freight = {
  id: string
  description: string
  weight: string
  destination: string
  status: string
}

type Truck = {
  id: string
  name: string
  comments: string
  freights: Freight[]
}

type EditingFreight = {
  truckId: string
  freightId: string
  data: Freight
}

export default function TruckFreightTable() {
  const [trucks, setTrucks] = useState<Truck[]>(initialTrucks)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editedComment, setEditedComment] = useState("")
  const [addingFreightToTruck, setAddingFreightToTruck] = useState<string | null>(null)
  const [editingFreight, setEditingFreight] = useState<EditingFreight | null>(null)
  const [expandedFreightId, setExpandedFreightId] = useState<string | null>(null)
  const [newFreight, setNewFreight] = useState<Freight>({
    id: "",
    description: "",
    weight: "",
    destination: "",
    status: "Scheduled",
  })

  const activeCardRef = useRef<HTMLDivElement | null>(null)

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

  const handleEditClick = (truckId: string, comment: string) => {
    setEditingId(truckId)
    setEditedComment(comment)
  }

  const handleSaveComment = (truckId: string) => {
    setTrucks((prevTrucks) =>
      prevTrucks.map((truck) => (truck.id === truckId ? { ...truck, comments: editedComment } : truck)),
    )
    setEditingId(null)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
  }

  const handleAddFreightClick = (truckId: string) => {
    // If already adding to this truck, toggle it off
    if (addingFreightToTruck === truckId) {
      setAddingFreightToTruck(null)
      return
    }

    // Generate a new freight ID based on the truck ID
    const truckIndex = trucks.findIndex((t) => t.id === truckId)
    const freightCount = trucks[truckIndex].freights.length + 1
    const newFreightId = `FRT-${truckId.split("-")[1]}${freightCount.toString().padStart(2, "0")}`

    setNewFreight({
      id: newFreightId,
      description: "",
      weight: "",
      destination: "",
      status: "Scheduled",
    })
    setAddingFreightToTruck(truckId)
  }

  const handleFreightInputChange = (field: keyof Freight, value: string) => {
    setNewFreight((prev) => ({ ...prev, [field]: value }))
  }

  const handleEditFreightInputChange = (field: keyof Freight, value: string) => {
    if (!editingFreight) return
    setEditingFreight({
      ...editingFreight,
      data: { ...editingFreight.data, [field]: value },
    })
  }

  const handleSaveNewFreight = () => {
    if (!addingFreightToTruck) return

    // Validate required fields
    if (!newFreight.description || !newFreight.weight || !newFreight.destination) {
      alert("Please fill in all required fields")
      return
    }

    setTrucks((prevTrucks) =>
      prevTrucks.map((truck) => {
        if (truck.id === addingFreightToTruck) {
          return {
            ...truck,
            freights: [...truck.freights, { ...newFreight }],
          }
        }
        return truck
      }),
    )

    // Reset form
    setAddingFreightToTruck(null)
    setNewFreight({
      id: "",
      description: "",
      weight: "",
      destination: "",
      status: "Scheduled",
    })
  }

  const handleCancelAddFreight = () => {
    setAddingFreightToTruck(null)
  }

  const handleFreightCardClick = (truckId: string, freight: Freight) => {
    // Toggle expanded state
    if (expandedFreightId === freight.id) {
      setExpandedFreightId(null)
      setEditingFreight(null)
    } else {
      setExpandedFreightId(freight.id)
      setEditingFreight({
        truckId,
        freightId: freight.id,
        data: { ...freight },
      })
    }
  }

  const handleSaveEditedFreight = () => {
    if (!editingFreight) return

    // Validate required fields
    if (!editingFreight.data.description || !editingFreight.data.weight || !editingFreight.data.destination) {
      alert("Please fill in all required fields")
      return
    }

    setTrucks((prevTrucks) =>
      prevTrucks.map((truck) => {
        if (truck.id === editingFreight.truckId) {
          return {
            ...truck,
            freights: truck.freights.map((freight) =>
              freight.id === editingFreight.freightId ? { ...editingFreight.data } : freight,
            ),
          }
        }
        return truck
      }),
    )

    // Close the expanded card
    setExpandedFreightId(null)
    setEditingFreight(null)
  }

  const handleCancelEditFreight = () => {
    setExpandedFreightId(null)
    setEditingFreight(null)
  }

  useEffect(() => {
    // Only add listener if a card is expanded
    if (expandedFreightId) {
      const handleClickOutside = (event: MouseEvent) => {
        // Check if the click is inside a dropdown menu
        const target = event.target as Element
        const isDropdownClick =
          target.closest('[role="combobox"]') ||
          target.closest('[role="option"]') ||
          target.closest("[data-radix-popper-content-wrapper]")

        // Only close if click is outside the card AND not in a dropdown
        if (activeCardRef.current && !activeCardRef.current.contains(event.target as Node) && !isDropdownClick) {
          setExpandedFreightId(null)
          setEditingFreight(null)
        }
      }

      // Add event listener
      document.addEventListener("mousedown", handleClickOutside)

      // Clean up
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [expandedFreightId])

  return (
    <div className="border rounded-md">
      <style jsx global>{`
        .freight-edit-form {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-in-out, padding 0.3s ease-in-out, opacity 0.2s ease-in-out;
          padding-top: 0;
          padding-bottom: 0;
          opacity: 0;
        }
        
        .freight-edit-form.open {
          max-height: 300px; /* Adjust based on your form's height */
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
          opacity: 1;
        }
        
        .freight-card {
          transition: border-color 0.2s ease-in-out;
        }
        
        .freight-card.editing {
          border-color: #3b82f6;
        }

        .freight-card.adding {
          border-color: #22c55e; /* Green border for adding new freight */
        }
      `}</style>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/6">Truck</TableHead>
            <TableHead className="w-1/2 text-center">Freights</TableHead>
            <TableHead className="text-center">Comments</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trucks.map((truck) => (
            <TableRow key={truck.id} className="align-top">
              <TableCell className="font-medium">
                <div className="py-2">
                  <div className="font-bold">{truck.name}</div>
                  <div className="text-sm text-muted-foreground">{truck.id}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col items-center">
                  <div className="space-y-2 py-2 w-full max-w-md">
                    {truck.freights.length > 0 ? (
                      truck.freights.map((freight) => {
                        const isExpanded = expandedFreightId === freight.id
                        const isEditing = editingFreight?.freightId === freight.id

                        return (
                          <div
                            key={freight.id}
                            ref={isExpanded ? activeCardRef : null}
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
                              onClick={() => handleFreightCardClick(truck.id, freight)}
                              role="button"
                              tabIndex={0}
                              aria-label={`${isExpanded ? "Collapse" : "Expand"} freight ${freight.id} details`}
                              aria-expanded={isExpanded}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  handleFreightCardClick(truck.id, freight)
                                }
                              }}
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-sm flex items-center">
                                  <Package className="mr-1 h-3 w-3" />
                                  {freight.id}
                                </span>
                                <Badge className={cn("text-white text-xs", getStatusColor(freight.status))}>
                                  {freight.status}
                                </Badge>
                              </div>
                              <div className="mt-1 text-xs text-muted-foreground">
                                {freight.description} • {freight.weight} • To: {freight.destination}
                              </div>
                            </div>

                            {/* Edit Form - Expands/collapses */}
                            <div className={cn("freight-edit-form px-3", isExpanded && "open")}>
                              <div className="border-t pt-3 mt-1">
                                <div className="space-y-3">
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <Label htmlFor={`edit-freight-id-${freight.id}`} className="text-xs">
                                        ID
                                      </Label>
                                      <Input
                                        id={`edit-freight-id-${freight.id}`}
                                        value={isEditing ? editingFreight.data.id : freight.id}
                                        className="h-8 text-xs"
                                        disabled
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor={`edit-freight-status-${freight.id}`} className="text-xs">
                                        Status
                                      </Label>
                                      <Select
                                        value={isEditing ? editingFreight.data.status : freight.status}
                                        onValueChange={(value) => handleEditFreightInputChange("status", value)}
                                        disabled={!isEditing}
                                      >
                                        <SelectTrigger id={`edit-freight-status-${freight.id}`} className="h-8 text-xs">
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
                                    <Label htmlFor={`edit-freight-desc-${freight.id}`} className="text-xs">
                                      Description*
                                    </Label>
                                    <Input
                                      id={`edit-freight-desc-${freight.id}`}
                                      value={isEditing ? editingFreight.data.description : freight.description}
                                      onChange={(e) => handleEditFreightInputChange("description", e.target.value)}
                                      className="h-8 text-xs"
                                      required
                                      autoFocus={isExpanded}
                                      disabled={!isEditing}
                                    />
                                  </div>

                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <Label htmlFor={`edit-freight-weight-${freight.id}`} className="text-xs">
                                        Weight*
                                      </Label>
                                      <Input
                                        id={`edit-freight-weight-${freight.id}`}
                                        value={isEditing ? editingFreight.data.weight : freight.weight}
                                        onChange={(e) => handleEditFreightInputChange("weight", e.target.value)}
                                        className="h-8 text-xs"
                                        placeholder="e.g. 5 tons"
                                        required
                                        disabled={!isEditing}
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor={`edit-freight-dest-${freight.id}`} className="text-xs">
                                        Destination*
                                      </Label>
                                      <Input
                                        id={`edit-freight-dest-${freight.id}`}
                                        value={isEditing ? editingFreight.data.destination : freight.destination}
                                        onChange={(e) => handleEditFreightInputChange("destination", e.target.value)}
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
                                      onClick={handleCancelEditFreight}
                                      className="h-7 px-2 text-xs"
                                    >
                                      Cancel
                                    </Button>
                                    <Button size="sm" onClick={handleSaveEditedFreight} className="h-7 px-2 text-xs">
                                      Save Changes
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <div className="py-2 text-muted-foreground italic text-sm">No freight assigned</div>
                    )}

                    {/* New Freight Card - Always visible */}
                    <div
                      className={cn(
                        "rounded-md border bg-background shadow-sm w-full freight-card",
                        addingFreightToTruck === truck.id && "adding",
                      )}
                    >
                      {/* Header - Always visible */}
                      <div
                        className={cn(
                          "p-2 hover:bg-muted/30 cursor-pointer transition-colors",
                          addingFreightToTruck === truck.id && "bg-muted/30",
                        )}
                        onClick={() => handleAddFreightClick(truck.id)}
                        role="button"
                        tabIndex={0}
                        aria-label="Add new freight"
                        aria-expanded={addingFreightToTruck === truck.id}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            handleAddFreightClick(truck.id)
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
                      <div className={cn("freight-edit-form px-3", addingFreightToTruck === truck.id && "open")}>
                        <div className="border-t pt-3 mt-1">
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label htmlFor={`freight-id-${truck.id}`} className="text-xs">
                                  ID
                                </Label>
                                <Input
                                  id={`freight-id-${truck.id}`}
                                  value={newFreight.id}
                                  onChange={(e) => handleFreightInputChange("id", e.target.value)}
                                  className="h-8 text-xs"
                                  disabled
                                />
                              </div>
                              <div>
                                <Label htmlFor={`freight-status-${truck.id}`} className="text-xs">
                                  Status
                                </Label>
                                <Select
                                  value={newFreight.status}
                                  onValueChange={(value) => handleFreightInputChange("status", value)}
                                >
                                  <SelectTrigger id={`freight-status-${truck.id}`} className="h-8 text-xs">
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
                              <Label htmlFor={`freight-desc-${truck.id}`} className="text-xs">
                                Description*
                              </Label>
                              <Input
                                id={`freight-desc-${truck.id}`}
                                value={newFreight.description}
                                onChange={(e) => handleFreightInputChange("description", e.target.value)}
                                className="h-8 text-xs"
                                required
                                autoFocus
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label htmlFor={`freight-weight-${truck.id}`} className="text-xs">
                                  Weight*
                                </Label>
                                <Input
                                  id={`freight-weight-${truck.id}`}
                                  value={newFreight.weight}
                                  onChange={(e) => handleFreightInputChange("weight", e.target.value)}
                                  className="h-8 text-xs"
                                  placeholder="e.g. 5 tons"
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor={`freight-dest-${truck.id}`} className="text-xs">
                                  Destination*
                                </Label>
                                <Input
                                  id={`freight-dest-${truck.id}`}
                                  value={newFreight.destination}
                                  onChange={(e) => handleFreightInputChange("destination", e.target.value)}
                                  className="h-8 text-xs"
                                  required
                                />
                              </div>
                            </div>

                            <div className="flex justify-end gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCancelAddFreight}
                                className="h-7 px-2 text-xs"
                              >
                                Cancel
                              </Button>
                              <Button size="sm" onClick={handleSaveNewFreight} className="h-7 px-2 text-xs">
                                Add Freight
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {editingId === truck.id ? (
                  <div className="py-2">
                    <textarea
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                      className="w-full p-2 border rounded-md text-sm min-h-[100px]"
                      autoFocus
                    />
                    <div className="flex gap-2 mt-2 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancelEdit}
                        className="h-8 px-2 text-xs flex items-center"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleSaveComment(truck.id)}
                        className="h-8 px-2 text-xs flex items-center"
                      >
                        <Save className="h-3 w-3 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="py-2 relative group">
                    <p className="text-sm pr-8">{truck.comments}</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleEditClick(truck.id, truck.comments)}
                    >
                      <Pencil className="h-3 w-3" />
                      <span className="sr-only">Edit comment</span>
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
