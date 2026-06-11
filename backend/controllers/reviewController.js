const Review = require("../models/Review");
const Booking = require("../models/Booking");
const User = require("../models/User");

const addReview = async (req, res) => {
  try {
    const {
      bookingId,
      rating,
      issue,
      comment,
    } = req.body;

    // Check booking exists
    const booking = await Booking.findById(
      bookingId
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Check booking belongs to logged-in user
    if (
      booking.user.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Review only for completed bookings
    if (booking.status !== "completed") {
      return res.status(400).json({
        success: false,
        message:
          "Review allowed only after completion",
      });
    }

    // Prevent duplicate reviews
    const existingReview =
      await Review.findOne({
        booking: bookingId,
        user: req.user.id,
      });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "Review already submitted",
      });
    }

    // Create review
const worker = await User.findById(
  booking.worker
);

const review = await Review.create({
  booking: bookingId,
  user: req.user.id,
  worker: booking.worker,
  profession: worker.profession,
  rating,
  issue,
  comment,
});
    // Recalculate worker rating
    const reviews = await Review.find({
      worker: booking.worker,
    });

    const totalRating = reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    const averageRating =
      reviews.length > 0
        ? totalRating / reviews.length
        : 0;

    await User.findByIdAndUpdate(
      booking.worker,
      {
        averageRating,
        totalReviews: reviews.length,
      }
    );

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getWorkerReviews = async (
  req,
  res
) => {
  try {
    const reviews = await Review.find({
      worker: req.params.workerId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      worker: req.user.id,
    })
      .select(
        "rating issue comment createdAt"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  addReview,
  getWorkerReviews,
  getMyReviews,
};