import { Box, Button, Grid, Modal, TextField } from "@mui/material";
import React from "react";
import { RatesType } from "../../../services/rates";
import { AxiosResponse } from "axios";
import _ from "lodash";
import { createRate } from "../../../services/rates";
import { toast, ToastContainer } from "react-toastify";

interface AddBookingModalType {
  isModalVisible: boolean;
  onClose: any;
}
const AddRatesModal: React.FC<AddBookingModalType> = (props) => {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const rateData: Omit<RatesType, "id" | "isDelete"> = {
      fromLocation: String(formData.get("fromLocation")),
      toLocation: String(formData.get("toLocation")),
      packageName: String(formData.get("packageName")),
      passengerCount: Number(formData.get("passengerCount")),
      price: Number(formData.get("rate")),
    };
    if (!_.isEmpty(rateData) || !_.isUndefined(rateData)) {
      createRate(rateData)
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
          width: "auto",
          alignItems: "center",
          justifyContent: "center",
          margin: "8%",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "1rem",
            borderRadius: "4px",
            outline: "none",
          }}
        >
          <h2>Add Rates</h2>

          <Box component="form" autoComplete="off" onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  name="fromLocation"
                  label="From Location"
                  sx={{ width: "64%" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  name="toLocation"
                  label="To Location"
                  sx={{ width: "64%" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  name="passengerCount"
                  label="Passenger Count"
                  sx={{ width: "64%" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  name="packageName"
                  label="Package Name"
                  sx={{ width: "64%" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField name="rate" label="Rate" sx={{ width: "64%" }} />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginRight: "0.5rem" }}
            >
              Add
            </Button>
          </Box>
          <Button variant="contained">Cancel</Button>
        </div>
      </Modal>
    </>
  );
};
export default AddRatesModal;
