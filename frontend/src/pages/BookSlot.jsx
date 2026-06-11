import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./BookSlot.css";

function BookSlot() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [address, setAddress] = useState("");

  const { id } = useParams();

const [worker, setWorker] = useState(null);
const [slots, setSlots] = useState([]);


const handleBooking = async () => {
  if (!selectedMonth) {
    alert("Select a month");
    return;
  }

  if (!selectedSlot) {
    alert("Select a slot");
    return;
  }

  if (!address) {
    alert("Enter address");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/bookings",
      {
        worker: id,
        slotMonth: selectedMonth,
        slotNumber: selectedSlot,
        address,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Booking Successful");

    setSelectedMonth("");
    setSelectedSlot("");
    setAddress("");
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Booking Failed"
    );
  }
};

useEffect(() => {
  fetchWorker();
}, [id]);

const fetchWorker = async () => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/worker/${id}`
    );

    console.log("Worker Data:", res.data.worker);

    setWorker(res.data.worker);
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  if (!worker || !selectedMonth) return;

  console.log("Monthly Slots:", worker.monthlySlots);
  console.log("Selected Month:", selectedMonth);

  const totalSlots =
    worker.monthlySlots[selectedMonth] || 0;

  console.log("Total Slots:", totalSlots);

  const generatedSlots = Array.from(
    { length: totalSlots },
    (_, i) => i + 1
  );

  setSlots(generatedSlots);
}, [selectedMonth, worker]);


  return (
    <div className="book-slot-container">
      <h2>Book Worker</h2>

      <div className="form-group">
        <label>Select Month</label>

        <select
  value={selectedMonth}
  onChange={(e) =>
    setSelectedMonth(e.target.value)
  }
>
  <option value="">Select Month</option>

  <option value="January">January</option>
  <option value="February">February</option>
  <option value="March">March</option>
  <option value="April">April</option>
  <option value="May">May</option>
  <option value="June">June</option>
  <option value="July">July</option>
  <option value="August">August</option>
  <option value="September">September</option>
  <option value="October">October</option>
  <option value="November">November</option>
  <option value="December">December</option>
</select>
      </div>

      {selectedMonth && (
        <>
          <h3>Available Slots</h3>

{slots.length === 0 ? (
  <p className="no-slots">
    No Slots Available For {selectedMonth}
  </p>
) : (
  <div className="slots-grid">
    {slots.map((slot) => (
      <div
        key={slot}
        className={`slot-card ${
          selectedSlot === slot
            ? "active"
            : ""
        }`}
        onClick={() =>
          setSelectedSlot(slot)
        }
      >
        Slot {slot}
      </div>
    ))}
  </div>
)}

          <div className="form-group">
            <label>Address</label>

            <textarea
              placeholder="Enter your address"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
            />
          </div>

          <button
            className="book-btn"
            onClick={handleBooking}
          >
            Book Now
          </button>
        </>
      )}
    </div>
  );
}

export default BookSlot;