"use client"

import { useState, useRef, useEffect } from "react"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { initialTrucks } from "@/data/trucks"
import { Truck, Freight, EditingFreight } from "@/types/types"
import { TruckRow } from "./truck-freight"



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
      <style>{`
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
      <Table className="table-fixed w-full max-h-[calc(100vh-10rem)] overflow-y-auto block">
        <TableHeader className="sticky top-0 z-10 bg-background">
          <TableRow>
            <TableHead className="w-1/6">Truck</TableHead>
            <TableHead className="w-1/2 text-center">Freights</TableHead>
            <TableHead className="text-center">Comments</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trucks.map((truck) => (
            <TruckRow
              key={truck.id}
              truck={truck}
              editingId={editingId}
              editedComment={editedComment}
              expandedFreightId={expandedFreightId}
              editingFreight={editingFreight}
              addingFreightToTruck={addingFreightToTruck}
              newFreight={newFreight}
              onEditClick={handleEditClick}
              onSaveComment={handleSaveComment}
              onCancelEdit={handleCancelEdit}
              onCommentChange={setEditedComment}
              onFreightCardClick={handleFreightCardClick}
              onEditFreightInputChange={handleEditFreightInputChange}
              onSaveEditedFreight={handleSaveEditedFreight}
              onCancelEditFreight={handleCancelEditFreight}
              onAddFreightClick={handleAddFreightClick}
              onFreightInputChange={handleFreightInputChange}
              onSaveNewFreight={handleSaveNewFreight}
              onCancelAddFreight={handleCancelAddFreight}
              activeCardRef={activeCardRef}
            />
          ))}
        </TableBody>
       
      </Table>
    </div>
  )
}
