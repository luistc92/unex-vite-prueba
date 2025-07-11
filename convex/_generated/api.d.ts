/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as fletes from "../fletes.js";
import type * as fletesForCamunda from "../fletesForCamunda.js";
import type * as google from "../google.js";
import type * as http from "../http.js";
import type * as importCities from "../importCities.js";
import type * as importCitiesScript from "../importCitiesScript.js";
import type * as schemaTypes from "../schemaTypes.js";
import type * as tasks from "../tasks.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  fletes: typeof fletes;
  fletesForCamunda: typeof fletesForCamunda;
  google: typeof google;
  http: typeof http;
  importCities: typeof importCities;
  importCitiesScript: typeof importCitiesScript;
  schemaTypes: typeof schemaTypes;
  tasks: typeof tasks;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
