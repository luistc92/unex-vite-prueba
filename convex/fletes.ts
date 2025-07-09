import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addFlete = mutation({
  args: {
    cliente: v.string(),
    id: v.float64(),
  },
  handler: async (ctx, args) => {
    const { cliente, id } = args;

    return await ctx.db.insert("fletes", {
      cliente,
      id,
    });
  },
});