import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, Box } from "@mui/material";
import NavigationBar from "../navigation-bar";
import { getAllBookings } from "../../../services/bookings";

const BookingsTable: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = await getAllBookings();
        console.log(data.data.data);
        if (Array.isArray(data.data.data)) {
          setBookings(data.data.data);
        } else {
          setError("Invalid data format");
        }
      } catch (error) {
        setError("Error fetching passengers: " + error);
      }
    }

    fetchBookings();
  }, []);

  return (
    <div style={{ flexGrow: 1 }}>
      <NavigationBar />
      <Box sx={{ maxWidth: "100%", margin: "8%" }}>
        <Typography variant="h3" style={{ flexGrow: 1, textAlign: "center" }}>
          Bookings
        </Typography>

        <TableContainer component={Paper}>
          <Table className={""} aria-label="rates table">
            <TableHead>
              <TableRow>
                <TableCell>Pickup Location</TableCell>
                <TableCell>Drop-off Location</TableCell>
                <TableCell>Pickup Date</TableCell>
                <TableCell>Pickup Time</TableCell>

                <TableCell>Luggage Pieces</TableCell>
                <TableCell>Booking Ref ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((row: any) => (
                <TableRow key={row.RateId}>
                  <TableCell>{row.PickupLocation}</TableCell>
                  <TableCell>{row.DropOffLocation}</TableCell>
                  <TableCell>{row.PickupDate}</TableCell>
                  <TableCell>{row.PickupTime}</TableCell>
                  <TableCell>{row.LuggagePieces}</TableCell>
                  <TableCell>{row.BookingRefId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};
export default BookingsTable;
