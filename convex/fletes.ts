import { mutation, query, action } from "./_generated/server";
import { v } from "convex/values";


export const addFlete = mutation({
  args: {
    cliente: v.id("clientes"),
    fleteId: v.float64(),
    unidad: v.id("unidades"),
  },
  handler: async (ctx, args) => {
    const { cliente, fleteId, unidad } = args;

    return await ctx.db.insert("fletes", {
      cliente,
      fleteId,
      unidad,
    });
  },
});


