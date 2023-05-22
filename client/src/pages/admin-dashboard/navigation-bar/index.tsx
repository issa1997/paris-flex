import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
const NavigationBar: React.FC = () => {
  return (
    <>
      {" "}
      <div style={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Paris Flex
            </Typography>
            <Button color="inherit" component={Link} to="/admin/rates">
              Rates
            </Button>
            <Button color="inherit" component={Link} to="/admin/bookings">
              Bookings
            </Button>
            <Button color="inherit" component={Link} to="/admin/passengers">
              Passengers
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/admin/booking-summary"
            >
              Booking Summary
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};
export default NavigationBar;
