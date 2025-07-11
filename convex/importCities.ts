import { internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import {Id} from "./_generated/dataModel";

// Internal mutation to create a single city
export const createCity = internalMutation({
  args: {
    name: v.string(),
    alias: v.string(),
    estado: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if city already exists to avoid duplicates
    const existingCity = await ctx.db
      .query("ciudades")
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();

    if (existingCity) {
      console.log(`City ${args.name} already exists, skipping...`);
      return existingCity._id;
    }

    const cityId = await ctx.db.insert("ciudades", {
      name: args.name,
      alias: args.alias,
      estado: args.estado,
    });

    console.log(`Created city: ${args.name}, ${args.estado}`);
    return cityId;
  },
});

// Internal mutation to batch create cities
export const batchCreateCities = internalMutation({
  args: {
    cities: v.array(v.object({
      name: v.string(),
      alias: v.string(),
      estado: v.string(),
    })),
  },
  handler: async (ctx, args) => {
    const results = [];
    
    for (const city of args.cities) {
      try {
        const cityId: Id<"ciudades"> = await ctx.runMutation(internal.importCities.createCity, city);
        results.push({ success: true, cityId, city });
      } catch (error) {
        console.error(`Error creating city ${city.name}:`, error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        results.push({ success: false, error: errorMessage, city });
      }
    }

    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    console.log(`Batch import completed: ${successful} successful, ${failed} failed`);
    return {
      total: args.cities.length,
      successful,
      failed,
      results
    };
  },
});

// Internal mutation to clear all cities (use with caution!)
export const clearAllCities = internalMutation({
  args: {},
  handler: async (ctx) => {
    const cities = await ctx.db.query("ciudades").collect();
    
    for (const city of cities) {
      await ctx.db.delete(city._id);
    }
    
    console.log(`Deleted ${cities.length} cities`);
    return { deleted: cities.length };
  },
});
