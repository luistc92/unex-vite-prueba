import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { eco } from "./schemaTypes";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
  }),

  clientes: defineTable({
    name: v.string(),
    pagaVacio: v.boolean(),
  }),

  fletes: defineTable({
    cliente: v.id("clientes"),
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
    cliente: v.id("clientes"),
    vacio: v.boolean(),
    clienteEspecifico: v.string(),
    origen: v.id("ciudades"),
    destino: v.id("ciudades"),
    tarifa: v.number(),
  }),

  tramos: defineTable({
    ciudad1: v.id("ciudades"),
    ciudad2: v.id("ciudades"),
    distancia: v.number(),
  })

});

