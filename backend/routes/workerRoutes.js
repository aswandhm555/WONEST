const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getDashboardStats,
  getWorkers,
  getWorkerProfile,
  updateWorkerProfile,
  searchWorkers,
  getWorkerById,
} = require("../controllers/workerController");

// Public Routes
router.get("/", getWorkers);
router.get("/search", searchWorkers);

// Protected Routes
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("worker"),
  getDashboardStats
);

router.get(
  "/profile",
  authMiddleware,
  roleMiddleware("worker"),
  getWorkerProfile
);

router.put(
  "/profile",
  authMiddleware,
  roleMiddleware("worker"),
  updateWorkerProfile
);

// KEEP THIS LAST
router.get("/:id", getWorkerById);

module.exports = router;