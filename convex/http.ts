import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

/* Fletes para Camunda*/

http.route({
  path: "/addFleteFromCamunda",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    console.log(request)
    const body = await request.json();
    const { cliente, fleteId, eco } = body 
    await ctx.runMutation(api.fletesForCamunda.addFleteFromCamunda, {
      cliente,
      fleteId,
      eco,
    });

    return new Response(null, {
      status: 200,
    });
  })

});

http.route({
  path: "/getFletesConMismaInformacion",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    console.log(request)
    const body = await request.json();
    const { fleteId, vacio } = body 
    await ctx.runQuery(api.fletesForCamunda.getFletesConMismaInformacion, {
      fleteId,
      vacio,
    });

    return new Response(null, {
      status: 200,
    });
  })

});

http.route({
  path: "/getFletesAnterioresUnidad",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    console.log(request)
    const body = await request.json();
    const { numberOfFletes, eco } = body 
    await ctx.runQuery(api.fletesForCamunda.getFletesAnterioresUnidad, {
      numberOfFletes,
      eco,
    });

    return new Response(null, {
      status: 200,
    });
  })

});




// Convex expects the router to be the default export of `convex/http.js`.
export default http;