import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ReactComponent as Travellers } from "../../assets/icons/healthicons_travel-alt-outline.svg";
import { ReactComponent as Repeat } from "../../assets/icons/repeat.svg";
import { ReactComponent as Passengers } from "../../assets/icons/passengers.svg";
import { ReactComponent as OneWay } from "../../assets/icons/one-way.svg";
import { ReactComponent as StepA } from "../../assets/icons/step-a.svg";
import { ReactComponent as StepB } from "../../assets/icons/step-b.svg";
import { ReactComponent as Calendar } from "../../assets/icons/calendar.svg";
import { ReactComponent as Clock } from "../../assets/icons/clock.svg";
import "./index.css";
import EditTripModal from "../edit-trp-modal";
import AddReturnTripModal from "../return-trip-modal";

const YourTransfer: React.FC<{
  pickupLocation: string | null;
  dropoffLocation: string | null;
  date: string | null;
  time: string | null;
  passengers: string | null;
  passengerId: number;
}> = (props) => {
  const [editModal, setEditModal] = useState(false);
  const [addReturn, setAddReturn] = useState(false);

  const handleClose = () => {
    setEditModal(false);
    setAddReturn(false);
  };
  return (
    <>
      <Card
        className="main-card-style"
        sx={{
          boxShadow: "0px 4px 70px rgba(62, 62, 185, 0.08)",
          borderRadius: "20px",
        }}
      >
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            className="header-style"
            component="div"
          >
            <Travellers /> Your Transfer
          </Typography>
          <Divider variant="middle" />
          <p className="p-text-style">Outward journey</p>
          <div>
            <Box className="stepper-styles">
              <Stepper orientation="vertical" className="step-text-styles">
                <Step key={1}>
                  <StepLabel StepIconComponent={StepA}>
                    {props.pickupLocation}
                  </StepLabel>
                </Step>
                <Step key={2}>
                  <StepLabel StepIconComponent={StepB}>
                    {props.dropoffLocation}
                  </StepLabel>
                </Step>
              </Stepper>
              <Stepper orientation="vertical">
                <Step key={3}>
                  <StepLabel StepIconComponent={Calendar}>
                    {props.date}
                  </StepLabel>
                </Step>
              </Stepper>
              <Stepper orientation="vertical">
                <Step key={4}>
                  <StepLabel StepIconComponent={Clock}>{props.time}</StepLabel>
                </Step>
              </Stepper>
            </Box>
          </div>
          <Divider variant="middle" />
          <p className="p-text-style">Book smart ! Add a return Journey</p>
          <Grid container className="edit-trip">
            <Typography variant="h6" className="change-mind-styles">
              Change Mind?
            </Typography>
            <Button className="edit-button" onClick={() => setEditModal(true)}>
              Edit Trip
            </Button>
          </Grid>
          <Grid container className="button-container">
            <Button className="box-styles passengerss">
              <Passengers className="icon-styles" />{" "}
              <p className="text-style">3 Passengers</p>
            </Button>
            <Button className="box-styles onewayy">
              <OneWay /> <p className="text-style">One way</p>
            </Button>
            <Button
              className="button-styles"
              onClick={() => setAddReturn(true)}
            >
              ADD RETURN <Repeat className="svg-icon" />
            </Button>
          </Grid>
        </CardContent>
      </Card>
      <EditTripModal
        editData={{
          dropoffLocation: props.dropoffLocation,
          passengers: Number(props.passengers),
          pickupDate: props.date,
          pickupLocation: props.pickupLocation,
          pickupTime: props.time,
          passengerId: props.passengerId,
        }}
        isModalVisible={editModal}
        onClose={handleClose}
      />
      <AddReturnTripModal isModalVisible={addReturn} onClose={handleClose} />
    </>
  );
};
export default YourTransfer;
