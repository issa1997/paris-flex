import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import NavigationBar from "../navigation-bar";
import _ from "lodash";
import { useEffect, useState } from "react";
import { getAllBookingsPassengersAndPassengerExtras } from "../../../services/bookings";

const BookingsPassengrsSummary: React.FC = () => {
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    getAllBookingsPassengersAndPassengerExtras().then((response) => {
      const tableData = response.data.data;
      if (!_.isEmpty(tableData)) {
        setTableData(tableData);
      }
    });
  }, []);

  return (
    <div style={{ flexGrow: 1 }}>
      <NavigationBar />
      <Box sx={{ maxWidth: "100%", margin: "8%" }}>
        <Typography variant="h3" style={{ flexGrow: 1, textAlign: "center" }}>
          Booking / Passengers Summary
        </Typography>
        <TableContainer component={Paper}>
          {_.isEmpty(tableData) ? (
            <CircularProgress color="success" />
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Passenger Count</TableCell>
                  <TableCell>Travel Number</TableCell>
                  <TableCell>Travel From</TableCell>
                  <TableCell>Pickup Date</TableCell>
                  <TableCell>Pickup Time</TableCell>
                  <TableCell>Luggage Pieces</TableCell>
                  <TableCell>Booking Ref Id</TableCell>
                  <TableCell>Return Location</TableCell>
                  <TableCell>Return Drop Location</TableCell>
                  <TableCell>Return Time</TableCell>
                  <TableCell>Return Date</TableCell>
                  <TableCell>Extras Description</TableCell>
                  <TableCell>Child Seats</TableCell>
                  <TableCell>Booster Seats</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.passengerCount}</TableCell>
                    <TableCell>{row.travelNumber}</TableCell>
                    <TableCell>{row.travelFrom}</TableCell>
                    <TableCell>{row.pickUpDate}</TableCell>
                    <TableCell>{row.PickUpTime}</TableCell>
                    <TableCell>{row.luggagePieces}</TableCell>
                    <TableCell>{row.bookingRefId}</TableCell>
                    <TableCell>{row.returnDropLocation}</TableCell>
                    <TableCell>{row.returnTime}</TableCell>
                    <TableCell>{row.returnDate}</TableCell>
                    <TableCell>{row.extrasDescription}</TableCell>
                    <TableCell>{row.childSeats}</TableCell>
                    <TableCell>{row.boosterSeats}</ TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Box>
    </div>
  );
};

export default BookingsPassengrsSummary;
