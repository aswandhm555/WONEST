import { useEffect, useState } from "react";
import axios from "axios";
import "./WorkersSection.css";
import { useNavigate } from "react-router-dom";

function WorkersSection() {
  const [workers, setWorkers] = useState([]);
  const [profession, setProfession] = useState("");
const [location, setLocation] = useState("");
const [rating, setRating] = useState("");
  const navigate = useNavigate();

useEffect(() => {
  fetchWorkers();
}, [profession, location, rating]);

 const fetchWorkers = async () => {
  try {
    let url =
      "http://localhost:5000/api/worker/search?";

    if (profession)
      url += `profession=${profession}&`;

    if (location)
      url += `place=${location}&`;

    if (rating)
      url += `rating=${rating}`;

    const res = await axios.get(url);

    setWorkers(res.data.workers);
  } catch (error) {
    console.log(error);
  }
};
  return (
    <section className="workers-home" id="workers">
      <h2>Available Workers</h2>
      <div className="filter-panel">

  <div className="filter-group">
    <label>Profession</label>

    <select
  value={profession}
  onChange={(e) =>
    setProfession(e.target.value)
  }
>
  <option value="">
    All Professions
  </option>

  <option value="Carpenter">Carpenter</option>
  <option value="Plumber">Plumber</option>
  <option value="Electrician">Electrician</option>
  <option value="Painter">Painter</option>
  <option value="Mason">Mason</option>
  <option value="Welder">Welder</option>
  <option value="AC Technician">AC Technician</option>

  <option value="Tile Worker">Tile Worker</option>
  <option value="Roofing Worker">Roofing Worker</option>
  <option value="Aluminium Fabricator">Aluminium Fabricator</option>
  <option value="Glass Worker">Glass Worker</option>

  <option value="CCTV Technician">CCTV Technician</option>
  <option value="Solar Technician">Solar Technician</option>
  <option value="Generator Technician">Generator Technician</option>

  <option value="House Cleaner">House Cleaner</option>
  <option value="Deep Cleaning Worker">Deep Cleaning Worker</option>
  <option value="Gardener">Gardener</option>
  <option value="Pest Control Worker">Pest Control Worker</option>

  <option value="Interior Designer">Interior Designer</option>
  <option value="False Ceiling Worker">False Ceiling Worker</option>

  <option value="Kitchen Technician">Kitchen Technician</option>
  <option value="Furniture Repair Technician">
    Furniture Repair Technician
  </option>

  <option value="Appliance Repair Technician">
    Appliance Repair Technician
  </option>

  <option value="Refrigerator Technician">
    Refrigerator Technician
  </option>

  <option value="Washing Machine Technician">
    Washing Machine Technician
  </option>

  <option value="TV Technician">TV Technician</option>

  <option value="Water Tank Cleaner">
    Water Tank Cleaner
  </option>

  <option value="Borewell Technician">
    Borewell Technician
  </option>

  <option value="Handyman">Handyman</option>

  <option value="Gate Fabricator">
    Gate Fabricator
  </option>

  <option value="Steel Worker">Steel Worker</option>

  <option value="Construction Worker">
    Construction Worker
  </option>

  <option value="Driver">Driver</option>

  <option value="Mover & Packer">
    Mover & Packer
  </option>

  <option value="House Helper">
    House Helper
  </option>
</select>
  </div>

  <div className="filter-group">
    <label>Location</label>

    <input
      type="text"
      placeholder="Kannur"
      value={location}
      onChange={(e) =>
        setLocation(e.target.value)
      }
    />
  </div>

  <div className="filter-group">
    <label>Rating</label>

    <select
      value={rating}
      onChange={(e) =>
        setRating(e.target.value)
      }
    >
      <option value="">
        Any Rating
      </option>

      <option value="4">
        4★ & Above
      </option>

      <option value="3">
        3★ & Above
      </option>
    </select>
  </div>

</div>

      {workers.length > 0 ? (
        <div className="workers-grid">
          {workers.map((worker) => (
           <div
  key={worker._id}
  className="worker-card"
  onClick={() =>
    navigate(`/worker/${worker._id}`)
  }
>
              <img
                src={
                  worker.workPhotos?.length > 0
                    ? `http://localhost:5000/uploads/${worker.workPhotos[0]}`
                    : "https://via.placeholder.com/300x220"
                }
                alt={worker.name}
                className="worker-image"
              />

              <h3>{worker.name}</h3>
              <p>{worker.profession}</p>
              <p>{worker.place}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-workers">
          <h3>👷 No Workers Available Yet</h3>
          <p>
            We're currently onboarding skilled workers.
            Please check back later.
          </p>
        </div>
      )}
    </section>
  );
}

export default WorkersSection;