import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

// Action to import cities from a CSV string or JSON array
export const importCitiesFromData = internalAction({
  args: {
    data: v.string(), // CSV string or JSON string
    format: v.union(v.literal("csv"), v.literal("json")),
    clearExisting: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { data, format, clearExisting = false } = args;

    try {
      // Clear existing cities if requested
      if (clearExisting) {
        console.log("Clearing existing cities...");
        await ctx.runMutation(internal.importCities.clearAllCities, {});
      }

      let cities: Array<{ name: string; alias: string; estado: string }> = [];

      if (format === "json") {
        // Parse JSON data
        cities = JSON.parse(data);
      } else if (format === "csv") {
        // Parse CSV data
        const lines = data.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        
        // Find column indices
        const nameIndex = headers.findIndex(h => 
          h.includes('name') || h.includes('ciudad') || h.includes('city')
        );
        const aliasIndex = headers.findIndex(h => 
          h.includes('alias') || h.includes('short')
        );
        const estadoIndex = headers.findIndex(h => 
          h.includes('estado') || h.includes('state')
        );

        if (nameIndex === -1) {
          throw new Error("Could not find name/ciudad column in CSV");
        }
        if (estadoIndex === -1) {
          throw new Error("Could not find estado/state column in CSV");
        }

        // Parse data rows
        for (let i = 1; i < lines.length; i++) {
          const row = lines[i].split(',').map(cell => cell.trim().replace(/"/g, ''));
          
          if (row.length > nameIndex && row[nameIndex] && row[estadoIndex]) {
            cities.push({
              name: row[nameIndex],
              alias: aliasIndex !== -1 && row[aliasIndex] ? row[aliasIndex] : row[nameIndex],
              estado: row[estadoIndex],
            });
          }
        }
      }

      console.log(`Parsed ${cities.length} cities from ${format} data`);

      if (cities.length === 0) {
        return { success: false, message: "No cities found in data" };
      }

      // Import cities in batches
      const BATCH_SIZE = 50;
      let totalImported = 0;
      let totalFailed = 0;

      for (let i = 0; i < cities.length; i += BATCH_SIZE) {
        const batch = cities.slice(i, i + BATCH_SIZE);
        console.log(`Importing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(cities.length / BATCH_SIZE)}`);

        const result = await ctx.runMutation(internal.importCities.batchCreateCities, {
          cities: batch
        });

        totalImported += result.successful;
        totalFailed += result.failed;
      }

      return {
        success: true,
        total: cities.length,
        imported: totalImported,
        failed: totalFailed,
        message: `Successfully imported ${totalImported} cities, ${totalFailed} failed`
      };

    } catch (error) {
      console.error("Error importing cities:", error);
      return {
        success: false,
        message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      };
    }
  },
});

