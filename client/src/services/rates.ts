import { invoke } from "../utls/api-adapter";

export interface RatesType {
  id: number;
  fromLocation: string;
  toLocation: string;
  packageName: string;
  passengerCount: number;
  price: number;
  isDelete: boolean;
}

export interface RatesFromLocationType {
  toLocation: string;
  fromLocation: string;
  passengerCount: number;
  pickUpTime: string | null;
}

export async function getAllRates() {
  return invoke("api/rates/", "get", {});
}

export async function createRate(
  rate: Omit<RatesType, "id" | "isDelete" | "packageName">
) {
  return invoke("api/rates/", "post", rate);
}

export async function editRate(
  rate: Omit<RatesType, "id" | "isDelete" | "packageName">,
  id: string
) {
  return invoke(`api/rates/${id}`, "patch", rate);
}

export async function deleteRate(id: string) {
  return invoke(`api/rates/${id}`, "delete", {});
}

export async function getRate(id: string) {
  return invoke(`api/rates/${id}`, "get", {});
}

export async function getRateFromLocation(params: RatesFromLocationType) {
  return invoke(
    `api/rates/from-location/${params.toLocation}/${params.fromLocation}/${params.passengerCount}/${params.pickUpTime}`,
    "get",
    {}
  );
}
