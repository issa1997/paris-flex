import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleMenuItemClick = (component: any) => {
    setActiveComponent(component);
  };

  return (
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
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AdminDashboard;
