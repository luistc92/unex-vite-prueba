import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
  }),

  fletes: defineTable({
    cliente: v.string(),
    fleteId: v.float64(),
    unidad: v.id("unidades")
  })
  .index("by_unidad", ["unidad"])
  .index("by_fleteId", ["fleteId"]),

  unidades: defineTable({
    eco: v.string(),
  })
});

