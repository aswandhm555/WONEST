import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaEnvelope, FaPhone } from "react-icons/fa";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="profile-page">
      <div className="profile-card">

        <div className="profile-left">
          <FaUserCircle className="profile-avatar" />

          <h2 id="user-name">{user.name || "User Name"}</h2>

          <span className="user-badge">
            Registered User
          </span>
        </div>

        <div className="profile-right">
          <h1>My Profile</h1>

          <p className="profile-desc">
            Wonest is the ultimate marketplace connecting local workers to anyone, anywhere. Our platform eliminates traditional boundaries, giving local service providers a global stage to offer their talents directly to clients worldwide. Whether you need specialized local expertise from across town or across the globe, Wonest provides a seamless, secure, and instant connection to the right workforce, anytime.
          </p>

          <div className="info-box">
            <FaUserCircle />
            <span>{user.name}</span>
          </div>

          <div className="info-box">
            <FaEnvelope />
            <span>{user.email}</span>
          </div>

          <div className="info-box">
            <FaPhone />
            <span>{user.phone}</span>
          </div>

          <div className="profile-actions">
            <button
              className="booking-btn"
              onClick={() => navigate("/booking")}
            >
              My Bookings
            </button>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;