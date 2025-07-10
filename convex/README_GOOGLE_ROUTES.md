# Google Routes API Integration

This document explains how to use the modern Google Routes API integration in your Convex app. This replaces the legacy Distance Matrix API with the current, more powerful Routes API.

## Setup

### 1. Get a Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Routes API** (not the legacy Distance Matrix API)
4. Create credentials (API Key)
5. Optionally, restrict the API key to only the Routes API for security

### 2. Add Environment Variable

Add your Google Maps API key to your Convex environment:

```bash
npx convex env set GOOGLE_MAPS_API_KEY your_api_key_here
```

## Usage

### Basic Usage

```typescript
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

function MyComponent() {
  const getDistance = useMutation(api.fletes.getRouteDistance);

  const handleGetDistance = async () => {
    try {
      const result = await getDistance({
        origin: "Mexico City, Mexico",
        destination: "Guadalajara, Mexico",
        travelMode: "DRIVE", // DRIVE, BICYCLE, WALK, TWO_WHEELER, TRANSIT
        units: "METRIC" // METRIC or IMPERIAL
      });

      console.log("Distance:", result.distance.text);
      console.log("Duration:", result.duration.text);
      console.log("Distance in meters:", result.distance.meters);
      console.log("Duration in seconds:", result.duration.seconds);
      console.log("Polyline:", result.polyline);
    } catch (error) {
      console.error("Error getting distance:", error);
    }
  };

  return (
    <button onClick={handleGetDistance}>
      Get Distance
    </button>
  );
}
```

### Using with Your Cities Database

```typescript
// First, get cities from your database
const getCityByName = useQuery(api.fletes.getCityByName, { name: "Guadalajara" });

// Then use the city information to get distance
const getDistance = useMutation(api.fletes.getRouteDistance);

const handleGetDistance = async () => {
  if (originCity && destinationCity) {
    const origin = `${originCity.name}, ${originCity.estado}, Mexico`;
    const destination = `${destinationCity.name}, ${destinationCity.estado}, Mexico`;
    
    const result = await getDistance({
      origin,
      destination,
      travelMode: "DRIVE",
      units: "METRIC"
    });
  }
};
```

## API Response Format

The `getRouteDistance` action returns:

```typescript
{
  origin: string;           // Origin address
  destination: string;      // Destination address
  distance: {
    meters: number;         // Distance in meters
    text: string;          // Human-readable distance (e.g., "543.2 km")
  };
  duration: {
    seconds: number;       // Duration in seconds
    text: string;          // Human-readable duration (e.g., "5h 30m")
  };
  polyline: string | null; // Encoded polyline for route visualization
  travelMode: string;      // Travel mode used
  status: "OK";
}
```

## Travel Modes

- **DRIVE**: Driving directions
- **BICYCLE**: Bicycling directions
- **WALK**: Walking directions  
- **TWO_WHEELER**: Two-wheeled motorized vehicle (motorcycle/scooter)
- **TRANSIT**: Public transportation

## Units

- **METRIC**: Kilometers and meters
- **IMPERIAL**: Miles and feet

## Advantages over Legacy Distance Matrix API

1. **More accurate**: Uses latest routing algorithms
2. **Better traffic data**: Real-time traffic-aware routing
3. **More travel modes**: Includes two-wheeler support
4. **Polyline included**: Get route visualization data
5. **Future-proof**: Actively maintained and updated
6. **Better performance**: Optimized for modern applications

## Error Handling

The action will throw errors in these cases:
- Missing Google Maps API key
- Invalid API response
- Route not found between cities
- Network errors
- Invalid travel mode for route

Always wrap calls in try-catch blocks for proper error handling.

## Cost Considerations

Google Routes API pricing:
- Check current pricing at [Google Maps Platform Pricing](https://developers.google.com/maps/billing/gmp-billing)
- Generally more cost-effective than legacy APIs
- Consider caching results for frequently requested routes
- Set up billing alerts in Google Cloud Console

## Tips

1. **Format addresses properly**: Include city, state, and country for best results
2. **Cache results**: Store frequently requested distances in your database
3. **Use appropriate travel mode**: Choose the right mode for your use case
4. **Error handling**: Always handle API errors gracefully
5. **Rate limiting**: Be mindful of API rate limits for high-volume usage
6. **Field masking**: The API uses field masking for optimal performance
