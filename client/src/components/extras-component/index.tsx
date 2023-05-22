import React, { useState } from "react";
import "./index.css";
import {
  Card,
  Typography,
  Box,
  Grid,
  InputLabel,
  Button,
  Fab,
  Stack,
  IconButton,
  TextField,
} from "@mui/material";
import { ReactComponent as Extras } from "../../assets/icons/extras.svg";
import { ReactComponent as RequiredSign } from "../../assets/icons/coolicon.svg";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow.svg";
import { ReactComponent as BabySeats } from "../../assets/icons/toddler-1.svg";
import { ReactComponent as Booster } from "../../assets/icons/seats-one.svg";
import { ReactComponent as FreeTag } from "../../assets/icons/free-tag.svg";
import { ReactComponent as Add } from "../../assets/icons/add.svg";
import { ReactComponent as Minus } from "../../assets/icons/minus.svg";
import {
  PassengerDetailExtrasType,
  createPassengerExtra,
} from "../../services/passengers-detail-extras";
import _ from "lodash";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { AxiosResponse } from "axios";

const ExtrasComponent: React.FC<{
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  activeStep: number;
  passengerId: number;
  setPassengerExtrasDetails: React.Dispatch<
    React.SetStateAction<
      Omit<PassengerDetailExtrasType, "id" | "isDelete"> | undefined
    >
  >;
}> = (props) => {
  const [boosterSeats, setBoosterSeats] = useState<number>(0);
  const [babySeats, setBabySeaters] = useState<number>(0);

  const handleAddPassengerExtra = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    // todo - if no extras handle the response

    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const passengerExtra: Omit<PassengerDetailExtrasType, "id" | "isDelete"> = {
      extrasDescription: String(formData.get("txtExtraDescription")),
      boosterSeats: Number(formData.get("txtBoosterSeats")),
      childSeats: Number(formData.get("txtBabySeats")),
      passengerId: props.passengerId,
    };
    props.setActiveStep(props.activeStep + 1);
    if (!_.isEmpty(passengerExtra) || !_.isUndefined(passengerExtra)) {
      createPassengerExtra(passengerExtra)
        .then((response: AxiosResponse) => {
          const restrcutredResponse: any = response.data;
          toast.success(restrcutredResponse.message, {
            position: "bottom-right",
          });
          props.setPassengerExtrasDetails(response.data.data);
          props.setActiveStep(props.activeStep + 1);
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
      <Card className="extras-card-style">
        <Typography gutterBottom variant="h5" className="heading-style">
          Extras
          <span>
            <Extras className="icon-styles" />
          </span>
        </Typography>
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleAddPassengerExtra}
        >
          <Grid container className="form-styles">
            <Grid
              xs={12}
              md={12}
              sm={12}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <InputLabel>
                Pickup Land Mark{" "}
                <span>
                  <RequiredSign />
                </span>
              </InputLabel>
              <TextField style={{width: "100%", marginTop: "-10px"}} />
            </Grid>
            <Grid xs={12} md={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <div>
                <InputLabel>
                  Note for chauffeur{" "}
                  <span>
                    <RequiredSign />
                  </span>
                </InputLabel>
                <textarea
                style={{padding: "10px"}}
                  id="txtExtraDescription"
                  name="txtExtraDescription"
                  className="input-bx"
                />
              </div>
            </Grid>
            <Grid xs={12} md={6} className="row-style" mt={{ sm: 3, xs: 0 }}>
              <Box className="free-seats-styles" mb={1} ml={{ sm: 1.5, xs: 0, md: 1.5 }}>
                <Stack
                  direction="row"
                  spacing={0}
                  justifyContent="center"
                  alignItems="center"
                  mt={1}
                >
                  <BabySeats className="seating-icon-style" />
                  <FreeTag />
                  <span className="seats-text">Baby Seats</span>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    onClick={() => {
                      if (babySeats > 0) {
                        setBabySeaters(babySeats - 1);
                      }
                    }}
                  >
                    <Minus />
                  </IconButton>
                  <input name="txtBabySeats" value={babySeats} type="hidden" />
                  <span className="seats-number">{babySeats}</span>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    onClick={() => setBabySeaters(babySeats + 1)}
                  >
                    <Add />
                  </IconButton>
                </Stack>
              </Box>
              <Box
                className="free-seats-styles"
                ml={{ sm: 1.5, xs: 0 ,md: 1.5}}
                mb={{ sm: 0, xs: 1.5 }}
              >
                <Stack
                  direction="row"
                  spacing={0}
                  justifyContent="center"
                  alignItems="center"
                  mt={1}
                >
                  <Booster className="seating-icon-style" />
                  <FreeTag />
                  <span className="seats-text">Booster Seats</span>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    onClick={() => setBoosterSeats(boosterSeats - 1)}
                  >
                    <Minus />
                  </IconButton>
                  <input
                    name="txtBoosterSeats"
                    value={boosterSeats}
                    type="hidden"
                  />
                  <span className="seats-number">{boosterSeats}</span>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    onClick={() => setBoosterSeats(boosterSeats + 1)}
                  >
                    <Add />
                  </IconButton>
                </Stack>
              </Box>
            </Grid>
            <Button className="submit-styles-extras" type="submit">
              Continue booking {"  "}
              <ArrowIcon className="submit-icon-style" />
            </Button>
          </Grid>
        </Box>
      </Card>
    </>
  );
};
export default ExtrasComponent;
