import {
  Autocomplete,
  Box,
  Button,
  Grid,
  InputLabel,
  Modal,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "./index.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { ReactComponent as Location } from "../../assets/icons/location.svg";
import { ReactComponent as Passengers } from "../../assets/icons/passengers.svg";
import { ReactComponent as Calendar } from "../../assets/icons/calendar.svg";
import { ReactComponent as Clock } from "../../assets/icons/clock.svg";
import { getAllLocations } from "../../services/locations";
import _ from "lodash";
import { ReactComponent as Cross } from "../../assets/icons/cross-black.svg";
import AddReturnTripModal from "../return-trip-modal";
import { BookingType, createBooking } from "../../services/bookings";
import { AxiosResponse } from "axios";
import { toast, ToastContainer } from "react-toastify";

export type EditTripData = {
  pickupLocation: string | null;
  dropoffLocation: string | null;
  passengers: number | null;
  pickupTime: any;
  pickupDate: any;
  passengerId: number;
};

interface EditTripModalType {
  isModalVisible: boolean;
  onClose: any;
  editData: EditTripData;
}

export interface formDataType {
  dropOffLocation: any;
  pickUpLocation: any;
  passengers: number | null;
  pickUpTime: any;
  pickUpDate: any;
  returnLocation: any;
  returnDropLocation: any;
  returnTime: any;
  returnDate: any;
}

const EditTripModal: React.FC<EditTripModalType> = (props) => {
  const [addReturn, setAddReturn] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [pickUpLocations, setPickUpLocations] = useState<any[]>([]);
  const [dropOffLocations, setDropOffLocations] = useState<any[]>([]);
  const [formData, setFormData] = useState<formDataType>({
    dropOffLocation: props.editData.dropoffLocation,
    passengers: props.editData.passengers,
    pickUpDate: new Date(props.editData.pickupDate),
    pickUpLocation: props.editData.pickupLocation,
    pickUpTime: new Date(props.editData.pickupTime),
    returnDate: "",
    returnDropLocation: "",
    returnLocation: "",
    returnTime: "",
  });

  const handleTimeChange = (time: any) => {
    setSelectedTime(time);
  };

  const handleReturnClose = () => {
    setAddReturn(false);
  };

  let passengerCount: any[] = [
    {
      value: "1",
      label: "1",
    },
    {
      value: "2",
      label: "2",
    },
    {
      value: "3",
      label: "3",
    },
    {
      value: "4",
      label: "4",
    },
  ];

  useEffect(() => {
    getAllLocations().then((response) => {
      if (!_.isEmpty(response) || !_.isEmpty(response.data.data)) {
        let locations: any[] = response.data.data;
        let pickUpLocations: any[] = locations.map((location) => {
          return {
            value: location.pickUpLocation,
            label: location.pickUpLocation,
          };
        });
        let dropOffLocations: any[] = locations.map((location) => {
          return {
            value: location.dropOffLocation,
            label: location.dropOffLocation,
          };
        });
        setPickUpLocations(pickUpLocations);
        setDropOffLocations(dropOffLocations);
      }
    });
  }, []);

  useEffect(() => {}, [props.editData]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const booking: BookingType = {
      pickUpLocation: formData.pickUpLocation.value,
      dropOffLocation: formData.dropOffLocation.value,
      passengerId: props.editData.passengerId,
      pickUpDate: "sd",
      PickUpTime: "sdddddd",
      rateId: 0,
      tripType: "one_way",
      luggagePieces: 0,
      bookingRefId: "sdx",
      price: 0,
      returnLocation: "",
      returnDropLocation: "",
      returnDate: "",
      returnTime: "",
    };
    if (!_.isEmpty(booking) || !_.isUndefined(booking)) {
      createBooking(booking)
        .then((response: AxiosResponse) => {
          const restrcutredResponse: any = response.data;
          toast.success(restrcutredResponse.message, {
            position: "bottom-right",
          });
        })
        .catch((error: any) => {
          const response: any = error.response.data;
          toast.error(response.message, { position: "bottom-right" });
        });
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal
        open={props.isModalVisible}
        onClose={props.onClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box className="edit-modal-styles" component="form" onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <div className="close-icon">
                {" "}
                <Cross height={15} width={15} onClick={props.onClose} />
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid>
                <Grid>
                  <InputLabel id="select-label">Pickup Location</InputLabel>
                  <div className="location-container">
                    <Location />
                    <Autocomplete
                      disablePortal
                      className="edit-trip-select"
                      options={pickUpLocations}
                      renderInput={(params) => <TextField {...params} />}
                      onChange={(
                        event: React.SyntheticEvent<Element, Event>,
                        value: any
                      ) => setFormData({ ...formData, pickUpLocation: value })}
                      value={formData.pickUpLocation}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <input
                    className="location-input"
                    placeholder="Enter your pickup locations."
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid>
                <Grid>
                  <InputLabel id="select-label">Dropoff Location</InputLabel>
                  <div className="location-container">
                    <Location />
                    <Autocomplete
                      disablePortal
                      className="edit-trip-select"
                      options={dropOffLocations}
                      renderInput={(params) => <TextField {...params} />}
                      onChange={(
                        event: React.SyntheticEvent<Element, Event>,
                        value: any
                      ) => setFormData({ ...formData, dropOffLocation: value })}
                      value={formData.dropOffLocation}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <input
                    className="location-input"
                    placeholder="Enter your destinations."
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid>
                <Grid>
                  <InputLabel id="select-label">Passengers</InputLabel>

                  <div className="location-container">
                    <Passengers />
                    <Autocomplete
                      disablePortal
                      className="edit-trip-select"
                      options={passengerCount}
                      renderInput={(params) => <TextField {...params} />}
                      onChange={(
                        event: React.SyntheticEvent<Element, Event>,
                        value: any
                      ) => setFormData({ ...formData, passengers: value })}
                      value={formData.passengers}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <input
                    className="location-input"
                    placeholder="How many passengers?"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid>
                <Grid>
                  <InputLabel id="select-label">Pickup Time</InputLabel>
                  <Clock />
                  <DateTimePicker
                    onChange={handleTimeChange}
                    value={selectedTime}
                    format="HH:mm a"
                    calendarIcon={null}
                    clearIcon={null}
                    className="date-picker"
                    amPmAriaLabel="Select AM/PM"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid>
                <Grid>
                  <InputLabel id="select-label">Pickup date</InputLabel>
                  <Calendar />

                  <DateTimePicker
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        pickUpDate: value,
                      })
                    }
                    value={formData.pickUpDate}
                    format="dd-MM-y"
                    className="date-picker"
                    disableClock={true}
                    calendarIcon={null}
                    minDate={new Date()}
                    formatDay={(locale: any, date: any) =>
                      date.toLocaleDateString(locale, { day: "numeric" })
                    }
                    formatMonth={(locale: any, date: any) =>
                      date.toLocaleDateString(locale, { month: "short" })
                    }
                    formatYear={(locale: any, date: any) =>
                      date.toLocaleDateString(locale, { year: "numeric" })
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                className="return-button-styles"
                onClick={() => setAddReturn(true)}
              >
                ADD RETURN
              </Button>
              <Button className="save-button-styles" type="submit">
                Save Trip
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <AddReturnTripModal
        isModalVisible={addReturn}
        onClose={handleReturnClose}
      />
    </>
  );
};
export default EditTripModal;
