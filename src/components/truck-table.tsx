import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, Package } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample data
const trucks = [
  {
    id: "TRK-001",
    model: "Volvo FH16",
    driver: "John Smith",
    status: "Active",
    capacity: "40 tons",
    freights: [
      { id: "FRT-101", description: "Electronics", weight: "5 tons", destination: "New York", status: "In Transit" },
      { id: "FRT-102", description: "Furniture", weight: "8 tons", destination: "Chicago", status: "Loading" },
      { id: "FRT-103", description: "Clothing", weight: "3 tons", destination: "Boston", status: "Scheduled" },
    ],
  },
  {
    id: "TRK-002",
    model: "Mercedes-Benz Actros",
    driver: "Sarah Johnson",
    status: "Maintenance",
    capacity: "35 tons",
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
    model: "Kenworth W990",
    driver: "Michael Brown",
    status: "Active",
    capacity: "38 tons",
    freights: [
      { id: "FRT-301", description: "Food Products", weight: "6 tons", destination: "Miami", status: "In Transit" },
      { id: "FRT-302", description: "Medical Supplies", weight: "2 tons", destination: "Atlanta", status: "Priority" },
      { id: "FRT-303", description: "Paper Goods", weight: "4 tons", destination: "Dallas", status: "Loading" },
      { id: "FRT-304", description: "Machinery", weight: "10 tons", destination: "Houston", status: "Scheduled" },
    ],
  },
  {
    id: "TRK-004",
    model: "Peterbilt 579",
    driver: "Emily Davis",
    status: "Inactive",
    capacity: "42 tons",
    freights: [],
  },
  {
    id: "TRK-005",
    model: "Scania R730",
    driver: "Robert Wilson",
    status: "Active",
    capacity: "36 tons",
    freights: [
      { id: "FRT-501", description: "Chemicals", weight: "8 tons", destination: "Denver", status: "In Transit" },
      { id: "FRT-502", description: "Textiles", weight: "5 tons", destination: "Phoenix", status: "Loading" },
    ],
  },
]

export default function TruckTable() {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})

  const toggleRow = (truckId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [truckId]: !prev[truckId],
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500"
      case "maintenance":
        return "bg-yellow-500"
      case "inactive":
        return "bg-gray-500"
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
      default:
        return "bg-slate-500"
    }
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Truck ID</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Driver</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Freights</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trucks.map((truck) => (
            <>
              <TableRow key={truck.id} className="hover:bg-muted/50">
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-8 w-8"
                    onClick={() => toggleRow(truck.id)}
                    aria-label={expandedRows[truck.id] ? "Collapse row" : "Expand row"}
                  >
                    {expandedRows[truck.id] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </TableCell>
                <TableCell className="font-medium">{truck.id}</TableCell>
                <TableCell>{truck.model}</TableCell>
                <TableCell>{truck.driver}</TableCell>
                <TableCell>
                  <Badge className={cn("text-white", getStatusColor(truck.status))}>{truck.status}</Badge>
                </TableCell>
                <TableCell>{truck.capacity}</TableCell>
                <TableCell>{truck.freights.length}</TableCell>
              </TableRow>
              {expandedRows[truck.id] && (
                <TableRow className="bg-muted/50">
                  <TableCell colSpan={7} className="p-0">
                    <div className="p-4">
                      <h3 className="mb-2 font-medium flex items-center">
                        <Package className="mr-2 h-4 w-4" />
                        Freight Details
                      </h3>
                      {truck.freights.length > 0 ? (
                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                          {truck.freights.map((freight) => (
                            <div key={freight.id} className="p-3 rounded-md border bg-background shadow-sm">
                              <div className="flex justify-between items-start">
                                <span className="font-medium">{freight.id}</span>
                                <Badge className={cn("text-white", getStatusColor(freight.status))}>
                                  {freight.status}
                                </Badge>
                              </div>
                              <div className="mt-2 space-y-1 text-sm">
                                <p>
                                  <span className="font-medium">Cargo:</span> {freight.description}
                                </p>
                                <p>
                                  <span className="font-medium">Weight:</span> {freight.weight}
                                </p>
                                <p>
                                  <span className="font-medium">Destination:</span> {freight.destination}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground italic">No freight assigned to this truck</p>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
