import { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";
import { useNavigate } from "react-router-dom";


function Admin() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalWorkers: 0,
    pendingWorkers: 0,
    totalBookings: 0,
  });

  const navigate = useNavigate();
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/");
};




  const [users, setUsers] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [pendingWorkers, setPendingWorkers] = useState([]);

  const [activeSection, setActiveSection] = useState("dashboard");

  const token = localStorage.getItem("token");
  const [monthlySlots, setMonthlySlots] = useState({
  January: 0,
  February: 0,
  March: 0,
  April: 0,
  May: 0,
  June: 0,
  July: 0,
  August: 0,
  September: 0,
  October: 0,
  November: 0,
  December: 0,
});

const increaseSlot = (month) => {
  setMonthlySlots((prev) => ({
    ...prev,
    [month]: prev[month] + 1,
  }));
};

const decreaseSlot = (month) => {
  setMonthlySlots((prev) => ({
    ...prev,
    [month]: Math.max(0, prev[month] - 1),
  }));
};

const saveSlots = async () => {
  try {
    console.log("Sending:", monthlySlots);

    const res = await axios.put(
      `http://localhost:5000/api/admin/worker-slots/${selectedWorker._id}`,
      {
        monthlySlots,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Saved:", res.data);

    const workersRes = await axios.get(
      "http://localhost:5000/api/admin/workers",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setWorkers(workersRes.data.workers);

    alert("Slots saved successfully");
  } catch (error) {
    console.log(error);
    console.log(error.response?.data);

    alert("Failed to save slots");
  }
};


  useEffect(() => {
    if (!token) return;

    if (activeSection === "reviews") {
  axios
    .get("http://localhost:5000/api/admin/reviews", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => setReviews(res.data.reviews))
    .catch((error) => console.log(error));
}

    if (activeSection === "dashboard") {
      axios
        .get("http://localhost:5000/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setStats(res.data.stats))
        .catch((error) => console.log(error));
    }

    if (activeSection === "users") {
      axios
        .get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUsers(res.data.users))
        .catch((error) => console.log(error));
    }

if (
  activeSection === "workers" ||
  activeSection === "slots"
) {
  axios
    .get("http://localhost:5000/api/admin/workers", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setWorkers(res.data.workers))
    .catch((error) => console.log(error));
}

    if (activeSection === "requests") {
      axios
        .get("http://localhost:5000/api/admin/pending-workers", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setPendingWorkers(res.data.workers))
        .catch((error) => console.log(error));
    }
  }, [activeSection, token]);





  const approveWorker = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/admin/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // refresh current screen data
      if (activeSection === "requests") {
        axios
          .get("http://localhost:5000/api/admin/pending-workers", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => setPendingWorkers(res.data.workers))
          .catch((error) => console.log(error));
      }
      if (activeSection === "dashboard") {
        axios
          .get("http://localhost:5000/api/admin/dashboard", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => setStats(res.data.stats))
          .catch((error) => console.log(error));
      }

    } catch (error) {
      console.log(error);
    }
  };

  const rejectWorker = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/admin/reject/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (activeSection === "requests") {
        axios
          .get("http://localhost:5000/api/admin/pending-workers", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => setPendingWorkers(res.data.workers))
          .catch((error) => console.log(error));
      }
      if (activeSection === "dashboard") {
        axios
          .get("http://localhost:5000/api/admin/dashboard", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => setStats(res.data.stats))
          .catch((error) => console.log(error));
      }

    } catch (error) {
      console.log(error);
    }
  };


const toggleWorkerStatus = async (id) => {
  try {
    await axios.put(
      `http://localhost:5000/api/admin/worker/${id}/toggle`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const res = await axios.get(
      "http://localhost:5000/api/admin/workers",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setWorkers(res.data.workers);
  } catch (error) {
    console.log(error);
  }
};




  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Panel</h2>

        <ul className="sidebar-menu">
          <li onClick={() => setActiveSection("dashboard")}>📊 Dashboard</li>
          <li onClick={() => setActiveSection("users")}>👥 Users</li>
          <li onClick={() => setActiveSection("workers")}>🛠 Workers</li>
          <li onClick={() => setActiveSection("slots")}>📅 Slot Management</li>
          <li onClick={() => setActiveSection("requests")}>⏳ Worker Requests</li>
          <li onClick={() => setActiveSection("reviews")}>⭐ Feedback & Reviews</li>
          <li onClick={handleLogout}>
  <i className="fas fa-sign-out-alt"></i> Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Dashboard */}
        {activeSection === "dashboard" && (
          <>
            <h1>Dashboard</h1>

            <div className="cards">
              <div className="card">
                <h3>Total Users</h3>
                <p>{stats.totalUsers}</p>
              </div>

              <div className="card">
                <h3>Total Workers</h3>
                <p>{stats.totalWorkers}</p>
              </div>

              <div className="card">
                <h3>Pending Requests</h3>
                <p>{stats.pendingWorkers}</p>
              </div>

              <div className="card">
                <h3>Total Bookings</h3>
                <p>{stats.totalBookings}</p>
              </div>
            </div>
          </>
        )}

       {/* Users */}
{activeSection === "users" && (
  <div className="table-section">
    <h2>All Users</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
        {/* Workers */}
        {activeSection === "workers" && (
          <div className="table-section">
            <h2>All Workers</h2>

            <table>
              <thead>
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Profession</th>
    <th>Experience</th>
    <th>Place</th>
    <th>Status</th>
    <th>Action</th>
  </tr>
</thead>

              <tbody>
                {workers.map((worker) => (
                  <tr key={worker._id}>
                    <td>{worker.name}</td>
                    <td>{worker.email}</td>
                    <td>{worker.profession}</td>
                    <td>{worker.experience}</td>
<td>{worker.place}</td>

<td>
  {worker.isActive ? (
    <span>🟢 Active</span>
  ) : (
    <span>🔴 Disabled</span>
  )}
</td>

<td>
  <button
    onClick={() =>
      toggleWorkerStatus(worker._id)
    }
  >
    {worker.isActive
      ? "Disable"
      : "Enable"}
  </button>
</td>                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}


        {/* Slot Management */}
        {activeSection === "slots" && (
  <div className="table-section">
    <h2>Slot Management</h2>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Profession</th>
          <th>Slots</th>
        </tr>
      </thead>

      <tbody>
        {workers.map((worker) => (
          <tr key={worker._id}>
            <td>{worker.name}</td>
            <td>{worker.profession}</td>

            <td>
             <button
  onClick={() => {
    setSelectedWorker(worker);

    if (worker.monthlySlots) {
      setMonthlySlots(worker.monthlySlots);
    }
  }}
>
  Manage Slots
</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>





{selectedWorker && (
  <div className="slot-box">
    <h3>{selectedWorker.name} Monthly Slots</h3>

    <div className="months-container">

      <div className="month-row">
        <span>January</span>
        <button onClick={() => decreaseSlot("January")}>-</button>
        <span>{monthlySlots.January}</span>
        <button onClick={() => increaseSlot("January")}>+</button>
      </div>

      <div className="month-row">
        <span>February</span>
        <button onClick={() => decreaseSlot("February")}>-</button>
        <span>{monthlySlots.February}</span>
        <button onClick={() => increaseSlot("February")}>+</button>
      </div>

      <div className="month-row">
        <span>March</span>
        <button onClick={() => decreaseSlot("March")}>-</button>
        <span>{monthlySlots.March}</span>
        <button onClick={() => increaseSlot("March")}>+</button>
      </div>

      <div className="month-row">
        <span>April</span>
        <button onClick={() => decreaseSlot("April")}>-</button>
        <span>{monthlySlots.April}</span>
        <button onClick={() => increaseSlot("April")}>+</button>
      </div>

      <div className="month-row">
        <span>May</span>
        <button onClick={() => decreaseSlot("May")}>-</button>
        <span>{monthlySlots.May}</span>
        <button onClick={() => increaseSlot("May")}>+</button>
      </div>

      <div className="month-row">
        <span>June</span>
        <button onClick={() => decreaseSlot("June")}>-</button>
        <span>{monthlySlots.June}</span>
        <button onClick={() => increaseSlot("June")}>+</button>
      </div>

      <div className="month-row">
        <span>July</span>
        <button onClick={() => decreaseSlot("July")}>-</button>
        <span>{monthlySlots.July}</span>
        <button onClick={() => increaseSlot("July")}>+</button>
      </div>

      <div className="month-row">
        <span>August</span>
        <button onClick={() => decreaseSlot("August")}>-</button>
        <span>{monthlySlots.August}</span>
        <button onClick={() => increaseSlot("August")}>+</button>
      </div>

      <div className="month-row">
        <span>September</span>
        <button onClick={() => decreaseSlot("September")}>-</button>
        <span>{monthlySlots.September}</span>
        <button onClick={() => increaseSlot("September")}>+</button>
      </div>

      <div className="month-row">
        <span>October</span>
        <button onClick={() => decreaseSlot("October")}>-</button>
        <span>{monthlySlots.October}</span>
        <button onClick={() => increaseSlot("October")}>+</button>
      </div>

      <div className="month-row">
        <span>November</span>
        <button onClick={() => decreaseSlot("November")}>-</button>
        <span>{monthlySlots.November}</span>
        <button onClick={() => increaseSlot("November")}>+</button>
      </div>

      <div className="month-row">
        <span>December</span>
        <button onClick={() => decreaseSlot("December")}>-</button>
        <span>{monthlySlots.December}</span>
        <button onClick={() => increaseSlot("December")}>+</button>
      </div>

    </div>

    
    <button
      className="save-btn"
      onClick={saveSlots}
    >
      Save Slots
    </button>
  </div>
)}
 
 </div>
)}






        {/* Worker Requests */}
        {activeSection === "requests" && (
          <div className="table-section">
            <h2>Pending Worker Requests</h2>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {pendingWorkers.map((worker) => (
                  <tr key={worker._id}>
                    <td>{worker.name}</td>
                    <td>{worker.email}</td>

                    <td>
                      <button onClick={() => approveWorker(worker._id)}>
                        Approve
                      </button>
                      <button onClick={() => rejectWorker(worker._id)}>
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Reviews */}
            {/* Reviews */}
      {activeSection === "reviews" && (
        <div className="table-section">
          <h2>Feedback & Reviews</h2>

          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Worker</th>
                <th>Profession</th>
                <th>Rating</th>
                <th>Issue</th>
                <th>Comment</th>
              </tr>
            </thead>

            <tbody>
              {reviews.map((review) => (
                <tr key={review._id}>
                  <td>{review.user?.name}</td>
                  <td>{review.worker?.name}</td>
                  <td>{review.worker?.profession}</td>
                  <td>⭐ {review.rating}/5</td>
                  <td>{review.issue}</td>
                  <td>{review.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
);
}

export default Admin;