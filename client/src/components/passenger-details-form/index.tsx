import React from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { ReactComponent as PassengersDetails } from "../../assets/icons/carbon_passenger-plus.svg";
import { ReactComponent as RequiredSign } from "../../assets/icons/coolicon.svg";
import { ReactComponent as TriangleIcon } from "../../assets/icons/triangle-icon.svg";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow.svg";
import { toast, ToastContainer } from "react-toastify";
import "./index.css";
import {
  PassengerDetailsType,
  createPassenger,
} from "../../services/passengers-details";
import "react-toastify/dist/ReactToastify.min.css";
import _ from "lodash";
import { AxiosResponse } from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
const phoneRegExp =
  /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
const validationSchema = yup.object({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  contact_no: yup
    .string()
    .matches(phoneRegExp, "Invalid phone number")
    .required("Contact number is required"),
  flight_train_no: yup.string().required("Flight/train number is required"),
  flight_train_from: yup.string().required("Flight/train from is required"),
});

const PassengerDetails: React.FC<{
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  activeStep: number;
  setPassengerId: React.Dispatch<React.SetStateAction<number>>;
  setPassengerDetails: React.Dispatch<
    React.SetStateAction<
      Omit<PassengerDetailsType, "id" | "isDelete"> | undefined
    >
  >;
  pasengers: number;
}> = (props) => {
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      contact_no: "",
      flight_train_no: "",
      flight_train_from: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const passenger: Omit<PassengerDetailsType, "id" | "isDelete"> = {
        name: values.first_name,
        lastName: values.last_name,
        email: values.email,
        passengerCount: Number(props.pasengers),
        phone: values.contact_no,
        travelFrom: values.flight_train_no,
        travelNumber: values.flight_train_from,
      };

      if (!_.isEmpty(passenger) || !_.isUndefined(passenger)) {
        createPassenger(passenger)
          .then((response: AxiosResponse) => {
            const restrcutredResponse: any = response.data;
            console.log(response.data);
            toast.success(restrcutredResponse.message, {
              position: "bottom-right",
            });
            props.setActiveStep(props.activeStep + 1);
            props.setPassengerId(restrcutredResponse.data.id);
            props.setPassengerDetails(restrcutredResponse.data);
            console.log(restrcutredResponse.data);
          })
          .catch((error: any) => {
            const response: any = error.response.data;
            toast.error(response.message, { position: "bottom-right" });
          });
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <Card className="passenger-detail-card-style-form">
        <Typography gutterBottom variant="h5" className="heading-style">
          Passenger Details
          <span>
            <PassengersDetails className="icon-styles" />
          </span>
        </Typography>
        <Box component="form" autoComplete="off" onSubmit={formik.handleSubmit}>
          <Grid container className="form-styles">
            <Grid item sm={6} xs={12}>
              <InputLabel>
                Name
                <span>
                  <RequiredSign />
                </span>
              </InputLabel>
              <TextField
                id="first_name"
                name="first_name"
                size="medium"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                error={
                  formik.touched.first_name && Boolean(formik.errors.first_name)
                }
                helperText={
                  formik.touched.first_name && formik.errors.first_name
                }
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <InputLabel>
                Last Name{" "}
                <span>
                  <RequiredSign />
                </span>
              </InputLabel>
              <TextField
                id="last_name"
                name="last_name"
                size="medium"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                error={
                  formik.touched.last_name && Boolean(formik.errors.last_name)
                }
                helperText={formik.touched.last_name && formik.errors.last_name}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <InputLabel>
                Email{" "}
                <span>
                  <RequiredSign />
                </span>
              </InputLabel>
              <TextField
                id="email"
                name="email"
                size="small"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <p className="warning-text" style={{ marginBottom: "6%" }}>
                <TriangleIcon /> We will send you booking details here
              </p>
            </Grid>

            <Grid item sm={6} xs={12}>
              <InputLabel>
                Contact Number{" "}
                <span>
                  <RequiredSign />
                </span>
              </InputLabel>

              <MuiTelInput
                id="contact_no"
                name="contact_no"
                size="medium"
                value={formik.values.contact_no}
                defaultCountry="FR"
                onChange={(value: any) => {
                  matchIsValidTel(value);
                  formik.setFieldValue("contact_no", value);
                }}
                error={
                  formik.touched.contact_no && Boolean(formik.errors.contact_no)
                }
                helperText={
                  formik.touched.contact_no && formik.errors.contact_no
                }
              />
              {/* <TextField
                id="contact_no"
                name="contact_no"
                size="medium"
                value={formik.values.contact_no}
                onChange={formik.handleChange}
                error={
                  formik.touched.contact_no && Boolean(formik.errors.contact_no)
                }
                helperText={
                  formik.touched.contact_no && formik.errors.contact_no
                }
              /> */}
              <div className="warning-text" style={{ marginBottom: "2%" }}>
                <TriangleIcon />
                Please provide us a working phone number in France. <br />
                We will contact you using WhatsApp
              </div>
            </Grid>
            <Grid item sm={6} xs={12}>
              <InputLabel>
                Flight/ train number{" "}
                <span>
                  <RequiredSign />
                </span>
              </InputLabel>
              <TextField
                id="flight_train_no"
                name="flight_train_no"
                size="medium"
                value={formik.values.flight_train_no}
                onChange={formik.handleChange}
                error={
                  formik.touched.flight_train_no &&
                  Boolean(formik.errors.flight_train_no)
                }
                helperText={
                  formik.touched.flight_train_no &&
                  formik.errors.flight_train_no
                }
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <InputLabel>
                Flight/ train from{"  "}
                <span>
                  <RequiredSign />
                </span>
              </InputLabel>
              <TextField
                id="flight_train_from"
                name="flight_train_from"
                size="medium"
                value={formik.values.flight_train_from}
                onChange={formik.handleChange}
                error={
                  formik.touched.flight_train_from &&
                  Boolean(formik.errors.flight_train_from)
                }
                helperText={
                  formik.touched.flight_train_from &&
                  formik.errors.flight_train_from
                }
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <Button className="submit-styles-button" type="submit">
                Continue booking {"  "}
                <ArrowIcon className="submit-icon-style" />
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};
export default PassengerDetails;
