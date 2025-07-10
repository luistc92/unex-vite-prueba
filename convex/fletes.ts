import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addFlete = mutation({
  args: {
    cliente: v.string(),
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

export const getFletesAnterioresUnidad = query({
  args: {
    numberOfFletes: v.number(),
    eco: v.string(),
  },
  handler: async (ctx, args) => {
    const { numberOfFletes, eco } = args;
    const unidad = await ctx.db.query("unidades")
      .filter(q => q.eq(q.field("eco"), eco))
      .unique();

    if (!unidad) {
      return [];
    }

    return await ctx.db.query("fletes")
      .withIndex("by_unidad", (q) => q.eq("unidad", unidad._id))
      .take(numberOfFletes);
  },
});

export const getFletesConMismaInformación = query({
  args: {
    fleteId: v.number(),
    vacio: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { fleteId, vacio } = args;

    return await ctx.db.query("fletes")
      .withIndex("by_fleteId", (q) => q.eq("fleteId", fleteId));
  },
});

