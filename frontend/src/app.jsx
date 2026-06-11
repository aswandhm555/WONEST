import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import User from "./pages/User";
import WorkerDetails from "./pages/WorkerDetails";
import Worker from "./pages/Worker";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import WorkerSlots from "./pages/WorkerSlots";
import BookSlot from "./pages/BookSlot";
import Booking from "./pages/Booking";



function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user" element={<User />} />
      <Route path="/worker/:id" element={<WorkerDetails />} />
      <Route path="/worker/:id/slots" element={<WorkerSlots />} />
      <Route path="/worker/:id/book" element={<BookSlot />} />
      <Route path="/worker" element={<Worker />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/booking" element={<Booking />} /> 
    </Routes>
  );
}

export default App;