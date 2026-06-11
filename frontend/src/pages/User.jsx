import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./User.css";
import WorkerSection from "../components/WorkersSection";


function User() {
  const [bookings, setBookings] = useState([]);
   const services = [
    "Carpenter",
    "Plumber",
    "Electrician",
    "Painter",
    "AC Technician",
    "Home Cleaning",
    "Gardening",
    "Appliance Repair",
    "Other Services",
  ];


useEffect(() => {
  fetchBookings();
}, []);

const fetchBookings = async () => {
  try {
    const token = localStorage.getItem("token");

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
  }
};  

  return (
    <div className="user-page">
      <Navbar />

     <section className="hero">
        
        <div className="hero-content">
          <h1>Find Trusted Local Workers Near You</h1>
          <p>
            Connect with skilled carpenters, plumbers, electricians,
            painters and more in just a few clicks.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">Find Workers</button>
            <button className="secondary-btn">Become a Worker</button>
          </div>
        </div>
      </section>
      
      {/* Services Section */}

      <section className="services" id="services">
        <h2>Popular Services</h2>

        <div className="service-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <h3>{service}</h3>
            </div>
          ))}
        </div>
      </section>

            <WorkerSection />

 <section className="how-it-works" id="how-it-works">
  <h2>How Wonest Works</h2>

  <div className="steps">
    <div className="step">
      <span>1</span>
      <h3>Search</h3>
      <p>Find workers based on your needs.</p>
    </div>

    <div className="step">
      <span>2</span>
      <h3>Book</h3>
      <p>Select a worker and schedule a service.</p>
    </div>

    <div className="step">
      <span>3</span>
      <h3>Get It Done</h3>
      <p>Enjoy professional service at your doorstep.</p>
    </div>
  </div>
</section>
      {/* CTA */}
      <section className="cta">
        <h2>Need Help Today?</h2>
        <p>Find skilled professionals in your area instantly.</p>
        <button className="primary-btn">Get Started</button>
      </section>

      <Footer />
    </div>
  );
}

export default User;