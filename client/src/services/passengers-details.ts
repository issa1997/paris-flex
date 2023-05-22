import { invoke } from "../utls/api-adapter";

export interface PassengerDetailsType {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  passengerCount: number;
  travelNumber: string;
  travelFrom: string;
  isDelete: boolean;
}

export async function getAllPassengers() {
  return invoke("api/passengers/", "get", {});
}

export async function createPassenger(
  passenger: Omit<PassengerDetailsType, "id" | "isDelete">
) {
  return invoke("api/passengers/", "post", passenger);
}

export async function editPassenger(
  passenger: PassengerDetailsType,
  id: string
) {
  return invoke(`api/passengers/${id}`, "patch", passenger);
}

export async function deletePassenger(id: string) {
  return invoke(`api/passengers/${id}`, "delete", {});
}

export async function getPassenger(id: string) {
  return invoke(`api/passengers/${id}`, "get", {});
}
