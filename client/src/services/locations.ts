import { invoke } from "../utls/api-adapter";

export async function getAllLocations() {
  return invoke("api/locations/", "get", {});
}
