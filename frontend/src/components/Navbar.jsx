import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        Wonest
      </div>

      <ul className="navbar-menu">
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => document.getElementById("services").scrollIntoView({ behavior: "smooth" })}>
          Services
        </li>
        <li onClick={() => document.getElementById("workers").scrollIntoView({ behavior: "smooth" })}>
          Workers
        </li>

        {isLoggedIn ? (
          <li onClick={() => navigate("/booking")}>Booking</li>
        ) : (
          <li onClick={() => document.getElementById("how-it-works").scrollIntoView({ behavior: "smooth" })}>
            How It Works
          </li>
        )}
      </ul>

      <div className="navbar-right">
        {!isLoggedIn ? (
          <button
            className="navbar-btn"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        ) : (
          <>
            <button
              className="navbar-btn"
              onClick={() => setShowMenu(!showMenu)}
            >
              Account
            </button>

            {showMenu && (
              <div className="dropdown">
                <p onClick={() => navigate("/profile")}>
                  My Profile
                </p>

                <p onClick={handleLogout}>
                  Logout
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;