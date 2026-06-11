import { useState, useEffect } from "react";
import axios from "axios";
import "./Worker.css";


function Worker() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({});
  const [bookings, setBookings] = useState([]);
  
const [reviews, setReviews] = useState([]);
  const token = localStorage.getItem("token");


useEffect(() => {
  if (token) {
    fetchDashboard();
    fetchBookings();
    fetchProfile();
    fetchReviews();
  }
}, []);

const fetchDashboard = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/worker/dashboard",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setStats(res.data.stats);
  } catch (err) {
    console.log(err);
  }
};

const fetchBookings = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/bookings/worker",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setBookings(res.data.bookings);
  } catch (err) {
    console.log(err);
  }
};

  const handleComplete = async (bookingId) => {
  if (!window.confirm("Mark this work as completed?")) return;

  try {
    await axios.put(
      `http://localhost:5000/api/bookings/complete/${bookingId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Work completed successfully");

    fetchBookings();
    fetchDashboard();
  } catch (err) {
    console.log(err);
  }
};


  const [worker, setWorker] = useState({});
 console.log("Worker State:", worker);

const fetchProfile = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/worker/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("PROFILE RESPONSE:", res.data);

    setWorker(res.data.worker);
  } catch (err) {
    console.log("PROFILE ERROR:", err);
  }
};

const fetchReviews = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/reviews/my-reviews",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setReviews(res.data.reviews);
  } catch (err) {
    console.log(
      err.response?.data || err.message
    );
  }
};

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div>
            <h2>Dashboard</h2>

<div className="cards">
  <div className="card">
    Total Works: {stats.totalWorks || 0}
  </div>

  <div className="card">
    Pending Works: {stats.pendingWorks || 0}
  </div>

  <div className="card">
    Completed Works: {stats.completedWorks || 0}
  </div>

  <div className="card">
    Today's Bookings: {stats.todayBookings || 0}
  </div>
</div>
          </div>
        );

      case "bookings":
        return (
          <div>
            <h2>Bookings</h2>

            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Phone</th>
                  <th>Slot</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.user?.name}</td>
                    <td>{booking.user?.phone}</td>
                    <td>
  {booking.slotMonth} - Slot {booking.slotNumber}
</td>
                    <td>{booking.status}</td>

                    <td>
                      {booking.status === "pending" ? (
                        <button
                          onClick={() =>
                            handleComplete(booking._id)
                          }
                        >
                          Complete
                        </button>
                      ) : (
                        "Completed"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );


        case "reviews":
  return (
    <div>
      <h2>Customer Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((review) => (
          <div className="review-card" key={review._id}>
            <p>
              <strong>Rating:</strong> ⭐ {review.rating}/5
            </p>

            <p>
              <strong>Review:</strong> {review.comment}
            </p>

            <p>
              <small>
                {new Date(review.createdAt).toLocaleDateString()}
              </small>
            </p>
          </div>
        ))
      )}
    </div>
  );




case "slots":
  return (
    <div>
      <h2>My Allocated Slots</h2>

      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Slots</th>
          </tr>
        </thead>

        <tbody>
          {worker.monthlySlots &&
            Object.entries(worker.monthlySlots).map(
              ([month, count]) => (
                <tr key={month}>
                  <td>{month}</td>
                  <td>{count}</td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  );

     case "completed":
  return (
    <div>
      <h2>Completed Works</h2>

      <div className="completed-section">
        {bookings
          .filter((b) => b.status === "completed")
          .map((booking) => (
            <div className="completed-item">
              <span className="worker-name">
                {booking.user?.name}
              </span>

              <span className="worker-month">
                {booking.slotMonth}
              </span>

              <span className="worker-slot">
                Slot {booking.slotNumber}
              </span>
            </div>
          ))}
      </div>
    </div>
  );

      case "pending":
  return (
    <div>
      <h2>Pending Works</h2>

      <div className="pending-section">
        {bookings
          .filter((b) => b.status === "pending")
          .map((booking) => (
            <div
              key={booking._id}
              className="pending-item"
            >
              <span className="pending-user">
                {booking.user?.name}
              </span>

              <span className="pending-month">
                {booking.slotMonth}
              </span>

              <span className="pending-slot">
                Slot {booking.slotNumber}
              </span>
            </div>
          ))}
      </div>
    </div>
  );


  
case "profile":
  return (
    <div className="profile-section">
      <h2>Profile</h2>

      <p><strong>Name:</strong> {worker.name}</p>
      <p><strong>Email:</strong> {worker.email}</p>
      <p><strong>Phone:</strong> {worker.phone}</p>
      <p><strong>Profession:</strong> {worker.profession}</p>
      <p><strong>Experience:</strong> {worker.experience}</p>
      <p><strong>Place:</strong> {worker.place}</p>
      <p><strong>About:</strong> {worker.about}</p>
      
    </div>
  );

      default:
        return <h2>Dashboard</h2>;
    }
  };

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};
  return (
    <div className="worker-dashboard">
      <div className="sidebar">
        <h2>Worker Panel</h2>

        <ul>
          <li onClick={() => setActiveTab("dashboard")}>
            📋 Dashboard
          </li>

          <li onClick={() => setActiveTab("bookings")}>
            📅 Bookings
          </li>

          <li onClick={() => setActiveTab("slots")}>
            🕒 Slots
          </li>

          <li onClick={() => setActiveTab("completed")}>
            ✅ Completed Works
          </li>

          <li onClick={() => setActiveTab("pending")}>
            ⏳ Pending Works
          </li>

          <li onClick={() => setActiveTab("reviews")}>
          ⭐ Reviews
          </li>

          <li onClick={() => setActiveTab("profile")}>
            👤 Profile
          </li>

          <li onClick={handleLogout}> Logout</li>
        </ul>
      </div>

      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
}

export default Worker;