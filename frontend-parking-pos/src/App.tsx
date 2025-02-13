import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import CheckInPage from "./pages/CheckInPage";
import "./App.css";
import CheckOutPage from "./pages/CheckOutPage";
import ParkingStatus from "./pages/ParkingStatus";

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/check-in" element={<CheckInPage />} />
          <Route path="/check-out" element={<CheckOutPage />} />
          <Route path="/status" element={<ParkingStatus />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
