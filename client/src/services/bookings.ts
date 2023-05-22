import { invoke } from "../utls/api-adapter";

export type BookingType = {
  pickUpLocation: string;
  dropOffLocation: string;
  passengerId: number;
  pickUpDate: string;
  PickUpTime: string;
  rateId: number;
  tripType: "one_way" | "round_trip";
  luggagePieces: number;
  bookingRefId: string;
  price: number;
  returnLocation: string;
  returnDropLocation: string;
  returnTime: string;
  returnDate: string;
};

export async function getAllBookings() {
  return invoke("api/bookings/", "get", {});
}

export async function getAllBookingsPassengersAndPassengerExtras() {
  return invoke("api/bookings/get-bookings-and-passengers", "get", {});
}

export async function createBooking(booking: BookingType) {
  return invoke("api/bookings/", "post", booking);
}
