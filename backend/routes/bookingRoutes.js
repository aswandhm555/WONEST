const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createBooking,
  getMyBookings,
  getWorkerBookings,
  acceptBooking,
  rejectBooking,
  completeBooking,
  cancelBooking,
} = require("../controllers/bookingController");

router.post(
  "/",
  authMiddleware,
  roleMiddleware("customer"),
  createBooking
);

router.get(
  "/my-bookings",
  authMiddleware,
  roleMiddleware("customer"),
  getMyBookings
);

router.get(
  "/worker",
  authMiddleware,
  roleMiddleware("worker"),
  getWorkerBookings
);

router.put(
  "/accept/:id",
  authMiddleware,
  roleMiddleware("worker"),
  acceptBooking
);

router.put(
  "/reject/:id",
  authMiddleware,
  roleMiddleware("worker"),
  rejectBooking
);

router.put(
  "/complete/:id",
  authMiddleware,
  roleMiddleware("worker"),
  completeBooking
);

router.put(
  "/cancel/:id",
  authMiddleware,
  roleMiddleware("customer"),
  cancelBooking
);

module.exports = router;