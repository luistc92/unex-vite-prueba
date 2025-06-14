// Sample data
export const initialTrucks = [
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