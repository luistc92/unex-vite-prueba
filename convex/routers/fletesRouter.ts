import { httpRouter } from "convex/server";
import { httpAction } from "../_generated/server";
import { api } from "../_generated/api";


const fletesRouter = httpRouter();


fletesRouter.route({
  path: "/addFlete",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    console.log(request)
    const body = await request.json();
    const { cliente, fleteId, unidad } = body 
    await ctx.runMutation(api.fletes.addFlete, {
      cliente,
      fleteId,
      unidad,
    });

    return new Response(null, {
      status: 200,
    });
  })

});



// Convex expects the router to be the default export of `convex/http.js`.
export default fletesRouter;