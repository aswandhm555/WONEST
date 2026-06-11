import { useState } from "react";
import axios from "axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [role, setRole] = useState("customer");
  const navigate = useNavigate();

  const [workPhotos, setWorkPhotos] = useState([null, null, null]);

  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [workerData, setWorkerData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    password: "",
    confirmPassword: "",
    place: "",
    profession: "",
    about: "",
  });

  const handleCustomerChange = (e) => {
    setCustomerData({
      ...customerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleWorkerChange = (e) => {
    setWorkerData({
      ...workerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCustomerSubmit = async (e) => {
    e.preventDefault();

    if (
      customerData.password !==
      customerData.confirmPassword
    ) {
      return alert("Passwords do not match");
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: customerData.name,
          email: customerData.email,
          phone: customerData.phone,
          password: customerData.password,
          role: "customer",
        }
      );

      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  const handleWorkerSubmit = async (e) => {
    e.preventDefault();

    if (
      workerData.password !==
      workerData.confirmPassword
    ) {
      return alert("Passwords do not match");
    }

    if (workPhotos.filter(Boolean).length !== 3) {
      return alert(
        "Please upload exactly 3 work photos"
      );
    }

    try {
      const formData = new FormData();

      formData.append("name", workerData.name);
      formData.append("email", workerData.email);
      formData.append("phone", workerData.phone);
      formData.append(
        "experience",
        workerData.experience
      );
      formData.append(
        "password",
        workerData.password
      );
      formData.append("role", "worker");
      formData.append("place", workerData.place);
      formData.append(
        "profession",
        workerData.profession
      );
      formData.append("about", workerData.about);

      workPhotos.forEach((photo) => {
        formData.append("workPhotos", photo);
      });

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="register-container">
      <h1>Join Wonest</h1>

      <div className="role-buttons">
        <button
          type="button"
          className={
            role === "customer" ? "active" : ""
          }
          onClick={() => setRole("customer")}
        >
          Customer
        </button>

        <button
          type="button"
          className={
            role === "worker" ? "active" : ""
          }
          onClick={() => setRole("worker")}
        >
          Worker
        </button>
      </div>

      {role === "customer" ? (
        <form
          className="register-form"
          onSubmit={handleCustomerSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleCustomerChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleCustomerChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            onChange={handleCustomerChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleCustomerChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleCustomerChange}
            required
          />

          <button type="submit">
            Register
          </button>
        </form>
      ) : (
        <form
          className="register-form"
          onSubmit={handleWorkerSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleWorkerChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleWorkerChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            onChange={handleWorkerChange}
            required
          />

          <input
            type="number"
            name="experience"
            placeholder="Years of Experience"
            onChange={handleWorkerChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleWorkerChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleWorkerChange}
            required
          />

          <select
  name="place"
  onChange={handleWorkerChange}
  required
>
  <option value="">Select Place</option>

  <option>Thiruvananthapuram</option>
  <option>Kollam</option>
  <option>Pathanamthitta</option>
  <option>Alappuzha</option>
  <option>Kottayam</option>

  <option>Kochi</option>
  <option>Thrissur</option>
  <option>Palakkad</option>
  <option>Malappuram</option>
  <option>Kozhikode</option>

  <option>Wayanad</option>
  <option>Kannur</option>
  <option>Thalassery</option>
  <option>Payyanur</option>
  <option>Kasaragod</option>
</select>

<select
  name="profession"
  onChange={handleWorkerChange}
  required
>
  <option value="">
    Select Profession
  </option>

  <option>Carpenter</option>
  <option>Plumber</option>
  <option>Electrician</option>
  <option>Painter</option>
  <option>Mason</option>
  <option>Welder</option>
  <option>AC Technician</option>

  <option>Tile Worker</option>
  <option>Roofing Worker</option>
  <option>Aluminium Fabricator</option>
  <option>Glass Worker</option>

  <option>CCTV Technician</option>
  <option>Solar Technician</option>
  <option>Generator Technician</option>

  <option>House Cleaner</option>
  <option>Deep Cleaning Worker</option>
  <option>Gardener</option>
  <option>Pest Control Worker</option>

  <option>Interior Designer</option>
  <option>False Ceiling Worker</option>
  <option>Wallpaper Installer</option>

  <option>Kitchen Technician</option>
  <option>Furniture Repair Technician</option>
  <option>Appliance Repair Technician</option>

  <option>Refrigerator Technician</option>
  <option>Washing Machine Technician</option>
  <option>TV Technician</option>

  <option>Water Tank Cleaner</option>
  <option>Borewell Technician</option>
  <option>Handyman</option>

  <option>Gate Fabricator</option>
  <option>Steel Worker</option>
  <option>Concrete Worker</option>
  <option>Construction Worker</option>

  <option>Home Security Installer</option>
  <option>Network Technician</option>
  <option>Inverter Technician</option>

  <option>Driver</option>
  <option>Mover & Packer</option>
  <option>House Helper</option>
</select>
          <textarea
            rows="5"
            name="about"
            placeholder="Tell customers about your work experience..."
            onChange={handleWorkerChange}
            required
          />

          <label>Upload Work Photos</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setWorkPhotos((prev) => [
                e.target.files[0],
                prev[1],
                prev[2],
              ])
            }
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setWorkPhotos((prev) => [
                prev[0],
                e.target.files[0],
                prev[2],
              ])
            }
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setWorkPhotos((prev) => [
                prev[0],
                prev[1],
                e.target.files[0],
              ])
            }
            required
          />

          <button type="submit">
            Register as Worker
          </button>
        </form>
      )}
    </div>
  );
}

export default Register;