import { useState } from "react"
import { useMutation, useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function RouteDistanceExample() {
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [travelMode, setTravelMode] = useState<"DRIVE" | "BICYCLE" | "WALK" | "TWO_WHEELER" | "TRANSIT">("DRIVE")
  const [units, setUnits] = useState<"METRIC" | "IMPERIAL">("METRIC")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getRouteDistance = useMutation(api.fletes.getRouteDistance)

  const handleCalculateDistance = async () => {
    if (!origin || !destination) {
      setError("Please enter both origin and destination")
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await getRouteDistance({
        origin,
        destination,
        travelMode,
        units,
      })
      setResult(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Route Distance Calculator</CardTitle>
          <CardDescription>
            Calculate distance and duration between two cities using Google Routes API
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="origin">Origin</Label>
              <Input
                id="origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="e.g., Mexico City, Mexico"
              />
            </div>
            <div>
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g., Guadalajara, Mexico"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="travelMode">Travel Mode</Label>
              <Select value={travelMode} onValueChange={(value: any) => setTravelMode(value)}>
                <SelectTrigger id="travelMode">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRIVE">Driving</SelectItem>
                  <SelectItem value="BICYCLE">Bicycling</SelectItem>
                  <SelectItem value="WALK">Walking</SelectItem>
                  <SelectItem value="TWO_WHEELER">Motorcycle/Scooter</SelectItem>
                  <SelectItem value="TRANSIT">Public Transit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="units">Units</Label>
              <Select value={units} onValueChange={(value: any) => setUnits(value)}>
                <SelectTrigger id="units">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="METRIC">Metric (km)</SelectItem>
                  <SelectItem value="IMPERIAL">Imperial (mi)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleCalculateDistance} 
            disabled={loading || !origin || !destination}
            className="w-full"
          >
            {loading ? "Calculating..." : "Calculate Distance"}
          </Button>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {result && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Route Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="font-medium">Distance:</Label>
                    <p>{result.distance.text}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Duration:</Label>
                    <p>{result.duration.text}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Travel Mode:</Label>
                    <p>{result.travelMode}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Distance (meters):</Label>
                    <p>{result.distance.meters.toLocaleString()}</p>
                  </div>
                </div>
                
                <div>
                  <Label className="font-medium">Route:</Label>
                  <p className="text-sm text-gray-600">
                    From: {result.origin}
                  </p>
                  <p className="text-sm text-gray-600">
                    To: {result.destination}
                  </p>
                </div>

                {result.polyline && (
                  <div>
                    <Label className="font-medium">Polyline (for mapping):</Label>
                    <p className="text-xs text-gray-500 break-all">
                      {result.polyline.substring(0, 100)}...
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
