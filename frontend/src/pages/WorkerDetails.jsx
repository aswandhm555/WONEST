import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";;
import axios from "axios";
import "./WorkerDetails.css";


function WorkerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [worker, setWorker] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorker();
  }, [id]);

  const fetchWorker = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/worker/${id}`
      );

      const workerData = res.data.worker;

      setWorker(workerData);

      if (
        workerData.workPhotos &&
        workerData.workPhotos.length > 0
      ) {
        setMainImage(
          `http://localhost:5000/uploads/${workerData.workPhotos[0]}`
        );
      }
    } catch (error) {
      console.error(
        "Error fetching worker:",
        error
      );
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="worker-details">
        <h2>Loading worker details...</h2>
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="worker-details">
        <h2>Worker not found</h2>
      </div>
    );
  }

  return (
    <div className="worker-details">
      <div className="worker-container">

        {/* Main Image */}
        <img
          src={
            mainImage ||
            "https://via.placeholder.com/600x400?text=No+Image"
          }
          alt="Worker"
          className="main-image"
        />

        {/* Gallery */}
        <div className="work-gallery">
          {worker.workPhotos &&
          worker.workPhotos.length > 0 ? (
            worker.workPhotos.map(
              (photo, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/uploads/${photo}`}
                  alt={`Work ${index + 1}`}
                  onClick={() =>
                    setMainImage(
                      `http://localhost:5000/uploads/${photo}`
                    )
                  }
                  className={
                    mainImage ===
                    `http://localhost:5000/uploads/${photo}`
                      ? "active-thumb"
                      : ""
                  }
                />
              )
            )
          ) : (
            <p>No work photos uploaded</p>
          )}
        </div>

        {/* Worker Info */}
        <div className="worker-info">
          <h1>{worker.name}</h1>

          <p className="service">
            🔧 {worker.profession}
          </p>

          <p>📍 {worker.place}</p>

          <p>📞 {worker.phone}</p>

          <p>
            ⭐ {worker.averageRating || 0}
          </p>

          <p>
            💼 {worker.experience || 0} Years
            Experience
          </p>

          <div className="about-box">
            <h3>About Worker</h3>
            <p>
              {worker.about ||
                "No description available"}
            </p>
          </div>

          <div className="booking-box">
  <button
    className="slot-btn"
    onClick={() =>
      navigate(`/worker/${worker._id}/slots`)
    }
  >
    📅 Check Slots
  </button>

  <button
    className="book-btn"
    onClick={() =>
      navigate(`/worker/${worker._id}/book`)
    }
  >
    ✅ Book With Slot
  </button>
</div>
        </div>

      </div>
    </div>
  );
}

export default WorkerDetails;