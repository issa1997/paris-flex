import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";

import {
  getAllPassengers,
  PassengerDetailsType,
} from "../../../services/passengers-details";
import NavigationBar from "../navigation-bar";
const PassengersTable: React.FC = () => {
  const [passengers, setPassengers] = useState<PassengerDetailsType[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchPassengers() {
      try {
        const data = await getAllPassengers();
        console.log(data.data.data);
        if (Array.isArray(data.data.data)) {
          setPassengers(data.data.data);
        } else {
          setError("Invalid data format");
        }
      } catch (error) {
        setError("Error fetching passengers: " + error);
      }
    }

    fetchPassengers();
  }, []);

  return (
    <div style={{ flexGrow: 1 }}>
      <NavigationBar />
      <Box sx={{ maxWidth: "100%", margin: "8%" }}>
        <Typography variant="h3" style={{ flexGrow: 1, textAlign: "center" }}>
          Passengers
        </Typography>
        <TableContainer component={Paper}>
          <Table className={""} aria-label="rates table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell>Passenger Count</TableCell>
                <TableCell>Flight/Train Number</TableCell>
                <TableCell>Flight/Train From</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {passengers.map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.passengerCount}</TableCell>
                  <TableCell>{row.travelNumber}</TableCell>
                  <TableCell>{row.travelFrom}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};
export default PassengersTable;
