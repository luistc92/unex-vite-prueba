import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { eco } from "./schemaTypes";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
  }),

  fletes: defineTable({
    cliente: v.string(),
    id: v.optional(v.number()),
    fleteId: v.optional(v.float64()),
    unidad: v.id("unidades")
  })
  .index("by_unidad", ["unidad"])
  .index("by_fleteId", ["fleteId"]),

  unidades: defineTable({
    eco: eco,
  }),

  ciudades: defineTable({
    name: v.string(),
    alias: v.string(),
    estado: v.string(),
  }),

  tarifas: defineTable({
    cliente: v.string(),
    vacio: v.boolean(),
    clienteEspecifico: v.string(),
    origenFlete : v.string(),
    destinoFlete: v.string(),
    tarifa: v.number(),
    tramo: v.string(),
  })

});

