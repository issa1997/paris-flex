import "./App.css";
import AdminDashboard from "./pages/admin-dashboard";
import Home from "./pages/home";
import { Routes, Route } from "react-router-dom";
import RatesTable from "./pages/admin-dashboard/rates";
import BookingsTable from "./pages/admin-dashboard/bookings";
import PassengersTable from "./pages/admin-dashboard/passengers";
import BookingSPassengrsSummary from "./pages/admin-dashboard/bookings-passengers-summary-table/bookingSummary";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/admin/rates" element={<RatesTable />} />
        <Route path="/admin/bookings" element={<BookingsTable />} />
        <Route path="/admin/passengers" element={<PassengersTable />} />
        <Route
          path="/admin/booking-summary"
          element={<BookingSPassengrsSummary />}
        />
      </Routes>
    </>
  );
}

export default App;
