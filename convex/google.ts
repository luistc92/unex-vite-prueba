import { query, action } from "./_generated/server";
import { v } from "convex/values";



// Google Routes API action - Modern replacement for Distance Matrix API
export const getRouteDistance = action({
  args: {
    origin: v.string(),
    destination: v.string(),
    travelMode: v.optional(v.union(
      v.literal("DRIVE"),
      v.literal("BICYCLE"),
      v.literal("WALK"),
      v.literal("TWO_WHEELER"),
      v.literal("TRANSIT")
    )),
    units: v.optional(v.union(v.literal("METRIC"), v.literal("IMPERIAL"))),
  },
  handler: async (ctx, args) => {
    const { origin, destination, travelMode = "DRIVE", units = "METRIC" } = args;

    // Get Google Maps API key from environment variables
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      throw new Error("Google Maps API key not found. Please set GOOGLE_MAPS_API_KEY environment variable.");
    }

    // Build the request body for the Routes API
    const requestBody = {
      origin: {
        address: origin
      },
      destination: {
        address: destination
      },
      travelMode: travelMode,
      units: units,
      routingPreference: "TRAFFIC_AWARE_OPTIMAL"
    };

    try {
      // Make the API call to the modern Routes API
      const response = await fetch("https://routes.googleapis.com/directions/v2:computeRoutes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline"
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Google Routes API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();

      // Check if we got routes
      if (!data.routes || data.routes.length === 0) {
        throw new Error(`No route found between ${origin} and ${destination}`);
      }

      const route = data.routes[0];

      return {
        origin: origin,
        destination: destination,
        distance: {
          meters: route.distanceMeters,
          text: units === "METRIC"
            ? `${(route.distanceMeters / 1000).toFixed(1)} km`
            : `${(route.distanceMeters * 0.000621371).toFixed(1)} mi`
        },
        duration: {
          seconds: parseInt(route.duration.replace('s', '')),
          text: formatDuration(parseInt(route.duration.replace('s', '')))
        },
        polyline: route.polyline?.encodedPolyline || null,
        travelMode: travelMode,
        status: "OK",
      };

    } catch (error) {
      console.error("Error calling Google Routes API:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      throw new Error(`Failed to get route distance: ${errorMessage}`);
    }
  },
});

// Helper function to format duration in a human-readable way
function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}

// Helper query to find a city by name in your database
export const getCityByName = query({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("ciudades")
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();
  },
});
