import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { eco } from "./schemaTypes";


export const addFleteFromCamunda = mutation({
  args: {
    cliente: v.string(),
    fleteId: v.float64(),
    eco: eco,
  },
  handler: async (ctx, args) => {
    const { cliente, fleteId, eco } = args;
    
    const unidad = await ctx.db.query("unidades")
      .filter(q => q.eq(q.field("eco"), eco))
      .unique();

    if (!unidad) {
      return [];
    }

    return await ctx.db.insert("fletes", {
      cliente,
      fleteId,
      unidad : unidad._id,
    });
  },
});

export const getFletesAnterioresUnidad = query({
  args: {
    numberOfFletes: v.number(),
    eco: eco,
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

export const getFletesConMismaInformacion = query({
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

export const getTarifaCamunda = query({
  args: {
    cliente: v.string(),
    vacio: v.boolean(),
    clienteEspecifico: v.string(),
    origenFlete : v.string(),
    destinoFlete: v.string(),
  },
  handler: async (ctx, args) => {
    const { cliente, vacio, clienteEspecifico, origenFlete, destinoFlete } = args;

    return await ctx.db.query("tarifas").collect()
      
  },
});
