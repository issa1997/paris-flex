import {
  Autocomplete,
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import "./index.css";
import DateTimePicker from "react-datetime-picker";
import { ReactComponent as Calendar } from "../../assets/icons/calendar.svg";
import { ReactComponent as Clock } from "../../assets/icons/clock.svg";
import { ReactComponent as Location } from "../../assets/icons/location.svg";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { ReactComponent as Cross } from "../../assets/icons/cross-black.svg";
import { formDataType } from "../edit-trp-modal";

interface AddReturnTripModalType {
  isModalVisible: boolean;
  onClose: any;
}
const AddReturnTripModal: React.FC<AddReturnTripModalType> = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const handleTimeChange = (time: any) => {
    setSelectedTime(time);
  };
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };
  const options = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
  ];
  return (
    <>
      <Modal
        open={props.isModalVisible}
        onClose={props.onClose}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box className="return-modal-styles">
          <Grid container spacing={2}>
            <Grid xs={12}>
              <div className="close-icon">
                {" "}
                <Cross height={15} width={15} onClick={props.onClose} />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid>
                <Grid>
                  <InputLabel id="select-label">Return Location</InputLabel>

                  <div className="return-location-container">
                    <Location />
                    <Autocomplete
                      disablePortal
                      className="return-trip-select"
                      options={options}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <input
                    className="location-input"
                    placeholder="Enter your destinations"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid>
                <Grid>
                  <InputLabel id="select-label">
                    Return Drop Location
                  </InputLabel>
                  <div className="return-location-container">
                    <Location />
                    <Autocomplete
                      disablePortal
                      className="return-trip-select"
                      options={options}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <input
                    className="location-input"
                    placeholder="Enter your destinations"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid>
                <Grid>
                  <InputLabel id="select-label">Return Time</InputLabel>
                  <Clock />
                  <DateTimePicker
                    onChange={handleTimeChange}
                    value={selectedTime}
                    format="HH:mm a"
                    calendarIcon={null}
                    clearIcon={null}
                    className="time-picker"
                    amPmAriaLabel="Select AM/PM"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid>
                <Grid>
                  <InputLabel id="select-label">Return Date</InputLabel>
                  <Calendar />
                  <DateTimePicker
                    minDate={new Date()}
                    onChange={handleDateChange}
                    value={selectedDate}
                    format="dd-MM-y"
                    className="date-picker"
                    disableClock={true}
                    calendarIcon={null}
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
            <Grid item xs={12} md={6}>
              <Button className="save-trip">Save Trip</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};
export default AddReturnTripModal;
