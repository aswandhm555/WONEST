const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    issue: {
      type: String,
      enum: [
        "Excellent Service",
        "Arrived On Time",
        "Professional Behaviour",
        "Good Quality Work",
        "Work Delayed",
        "Poor Communication",
        "Incomplete Work",
        "Overcharged",
        "Other"
      ],
      required: true,
    },

    comment: {
  type: String,
  default: "",
},

profession: {
  type: String,
},

  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);