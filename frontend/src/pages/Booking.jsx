import { useState, useEffect } from "react";
import axios from "axios";
import "./Booking.css";

function Booking() {
const [activeTab, setActiveTab] = useState("active");
const [bookings, setBookings] = useState([]);
const [loading, setLoading] = useState(true);
const [reviewData, setReviewData] = useState({});

const token = localStorage.getItem("token");

useEffect(() => {
fetchBookings();
}, []);

const fetchBookings = async () => {
try {
const res = await axios.get(
"http://localhost:5000/api/bookings/my-bookings",
{
headers: {
Authorization: `Bearer ${token}`,
},
}
);


  setBookings(res.data.bookings);
} catch (error) {
  console.log(error);
} finally {
  setLoading(false);
}


};

const cancelBooking = async (bookingId) => {
try {
await axios.put(
`http://localhost:5000/api/bookings/cancel/${bookingId}`,
{},
{
headers: {
Authorization: `Bearer ${token}`,
},
}
);

  fetchBookings();
} catch (error) {
  alert(
    error.response?.data?.message ||
      "Failed to cancel booking"
  );
}

};

const submitReview = async (bookingId) => {
const review = reviewData[bookingId];


if (!review?.rating || !review?.issue) {
  return alert(
    "Please select rating and issue"
  );
}

try {
  await axios.post(
    "http://localhost:5000/api/reviews",
    {
      bookingId,
      rating: review.rating,
      issue: review.issue,
      comment: review.comment || "",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  alert("Review submitted");

  setReviewData((prev) => ({
    ...prev,
    [bookingId]: {
      rating: "",
      issue: "",
      comment: "",
    },
  }));
} catch (error) {
  alert(
    error.response?.data?.message ||
      "Failed to submit review"
  );
}

};

if (loading) {
return <h3>Loading...</h3>;
}

return (
  <div className="booking-dashboard">
    <h2>My Bookings</h2>

  <div className="booking-tabs">
    <button
      className={
        activeTab === "active"
          ? "active"
          : ""
      }
      onClick={() =>
        setActiveTab("active")
      }>
      Active Bookings
    </button>

    <button
      className={
        activeTab === "completed"
          ? "active"
          : ""
      }
      onClick={() =>
        setActiveTab("completed")
      }
    >
      Completed
    </button>
  </div>

  {activeTab === "active" && (
    <div className="tab-content">
      {bookings
        .filter(
          (booking) =>
            booking.status !==
              "completed" &&
            booking.status !==
              "cancelled"
        )
        .map((booking) => (
          <div
            className="booking-card"
            key={booking._id}
          >
            <h3>
              {
                booking.worker
                  ?.name
              }
            </h3>

            <p>
              Profession:{" "}
              {
                booking.worker
                  ?.profession
              }
            </p>

            <p>
              Month:{" "}
              {
                booking.slotMonth
              }
            </p>

            <p>
              Slot:{" "}
              {
                booking.slotNumber
              }
            </p>

            <p>
              Address:{" "}
              {booking.address}
            </p>

            <p>
              Status:{" "}
              {booking.status}
            </p>

            {booking.status ===
              "pending" && (
              <button
                onClick={() =>
                  cancelBooking(
                    booking._id
                  )
                }
              >
                Cancel Booking
              </button>
            )}
          </div>
        ))}
    </div>
  )}

  {activeTab === "completed" && (
    <div className="tab-content">
      {bookings
        .filter(
          (booking) =>
            booking.status ===
            "completed"
        )
        .map((booking) => (
          <div
            className="booking-card"
            key={booking._id}
          >
            <h3>
              {
                booking.worker
                  ?.name
              }
            </h3>

            <p>
              Profession:{" "}
              {
                booking.worker
                  ?.profession
              }
            </p>

            <p>
              Month:{" "}
              {
                booking.slotMonth
              }
            </p>

            <p>
              Slot:{" "}
              {
                booking.slotNumber
              }
            </p>

            <p>
              Address:{" "}
              {booking.address}
            </p>

            <p>
              Status:
              Completed
            </p>

            <hr />

            <h4>
              Give Review
            </h4>

            <select
              value={
                reviewData[
                  booking._id
                ]?.rating || ""
              }
              onChange={(e) =>
                setReviewData(
                  (
                    prev
                  ) => ({
                    ...prev,
                    [
                      booking
                        ._id
                    ]: {
                      ...prev[
                        booking
                          ._id
                      ],
                      rating:
                        Number(
                          e
                            .target
                            .value
                        ),
                    },
                  })
                )
              }
            >
              <option value="">
                Select Rating
              </option>

              <option value="5">
                ⭐⭐⭐⭐⭐
              </option>

              <option value="4">
                ⭐⭐⭐⭐
              </option>

              <option value="3">
                ⭐⭐⭐
              </option>

              <option value="2">
                ⭐⭐
              </option>

              <option value="1">
                ⭐
              </option>
            </select>

            <select
              value={
                reviewData[
                  booking._id
                ]?.issue || ""
              }
              onChange={(e) =>
                setReviewData(
                  (
                    prev
                  ) => ({
                    ...prev,
                    [
                      booking
                        ._id
                    ]: {
                      ...prev[
                        booking
                          ._id
                      ],
                      issue:
                        e.target
                          .value,
                    },
                  })
                )
              }
            >
              <option value="">
                Select Issue
              </option>

              <option>
                Excellent Service
              </option>
              <option>
                Arrived On Time
              </option>
              <option>
                Professional Behaviour
              </option>
              <option>
                Good Quality Work
              </option>
              <option>
                Work Delayed
              </option>
              <option>
                Poor Communication
              </option>
              <option>
                Incomplete Work
              </option>
              <option>
                Overcharged
              </option>
              <option>
                Other
              </option>
            </select>

            <textarea
              placeholder="Comment..."
              value={
                reviewData[
                  booking._id
                ]?.comment ||
                ""
              }
              onChange={(e) =>
                setReviewData(
                  (
                    prev
                  ) => ({
                    ...prev,
                    [
                      booking
                        ._id
                    ]: {
                      ...prev[
                        booking
                          ._id
                      ],
                      comment:
                        e.target
                          .value,
                    },
                  })
                )
              }
            />

            <button
              onClick={() =>
                submitReview(
                  booking._id
                )
              }
            >
              Submit Review
            </button>
          </div>
        ))}
    </div>
  )}
</div>

);
}


export default Booking;
