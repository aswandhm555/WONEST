const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const roleMiddleware = require(
  "../middleware/roleMiddleware"
);

const {
  getDashboardStats,
  getPendingWorkers,
  getAllWorkers,
  getAllUsers,
  getAllReviews,
  toggleWorkerStatus,
  approveWorker,
  rejectWorker,
  updateWorkerSlots,
} = require("../controllers/adminController");

// Dashboard
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("admin"),
  getDashboardStats
);

// Pending Workers
router.get(
  "/pending-workers",
  authMiddleware,
  roleMiddleware("admin"),
  getPendingWorkers
);

// All Workers
router.get(
  "/workers",
  authMiddleware,
  roleMiddleware("admin"),
  getAllWorkers
);

// All Users
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  getAllUsers
);

// Approve Worker
router.put(
  "/approve/:id",
  authMiddleware,
  roleMiddleware("admin"),
  approveWorker
);

// Reject Worker
router.delete(
  "/reject/:id",
  authMiddleware,
  roleMiddleware("admin"),
  rejectWorker
);

router.put(
  "/worker-slots/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateWorkerSlots
);

router.put(
  "/worker/:id/toggle",
  authMiddleware,
  roleMiddleware("admin"),
  toggleWorkerStatus
);

router.get(
  "/reviews",
  authMiddleware,
  roleMiddleware("admin"),
  getAllReviews
);



module.exports = router;
