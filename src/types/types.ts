export type Freight = {
  id: string
  description: string
  weight: string
  destination: string
  status: string
}

export type Truck = {
  id: string
  name: string
  comments: string
  freights: Freight[]
}

export type EditingFreight = {
  truckId: string
  freightId: string
  data: Freight
}