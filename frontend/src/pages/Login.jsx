import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful");

if (res.data.user.role === "admin") {
  navigate("/admin");
} else if (res.data.user.role === "worker") {
  navigate("/worker");
} else {
  navigate("/user");
}
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-left">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="Login"
          />
        </div>

        <div className="login-right">
          <h1>Login to your Account</h1>
          <p>Find trusted local workers near you</p>

          <form
            className="login-form"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit">
              Login
            </button>
          </form>

          <div className="register-links">
            <Link to="/register">
              Register as User
            </Link>

            <Link to="/register">
              Register as Worker
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;