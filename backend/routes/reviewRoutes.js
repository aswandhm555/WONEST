const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const roleMiddleware = require(
  "../middleware/roleMiddleware"
);

const {
  addReview,
  getMyReviews,
} = require("../controllers/reviewController");

const {
  getWorkerReviews,
} = require("../controllers/workerController");

// Customer adds review
router.post(
  "/",
  authMiddleware,
  roleMiddleware("customer"),
  addReview
);

// Worker views own reviews
router.get(
  "/my-reviews",
  authMiddleware,
  roleMiddleware("worker"),
  getMyReviews
);

// Public worker reviews
router.get(
  "/worker/:workerId",
  getWorkerReviews
);

module.exports = router;