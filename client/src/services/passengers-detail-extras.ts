import { invoke } from "../utls/api-adapter";

export interface PassengerDetailExtrasType {
  id: number;
  passengerId: number;
  extrasDescription: string;
  childSeats: number;
  boosterSeats: number;
  isDelete: boolean;
}

export async function getAllPassengerExtras() {
  return invoke("api/passenger-extras/", "get", {});
}

export async function createPassengerExtra(
  passengerExtra: Omit<PassengerDetailExtrasType, "id" | "isDelete">
) {
  return invoke("api/passenger-extras/", "post", passengerExtra);
}

export async function editPassengerExtra(
  passengerExtra: PassengerDetailExtrasType,
  id: string
) {
  return invoke(`api/passenger-extras/${id}`, "patch", passengerExtra);
}

export async function deletePassengerExtra(id: string) {
  return invoke(`api/passenger-extras/${id}`, "delete", {});
}

export async function getPassengerExtra(id: string) {
  return invoke(`api/passenger-extras/${id}`, "get", {});
}
