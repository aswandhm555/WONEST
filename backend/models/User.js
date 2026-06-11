const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["customer", "worker", "admin"],
      default: "customer",
    },

    profession: {
      type: String,
      default: "",
    },

    experience: {
      type: Number,
      default: 0,
    },

    place: {
      type: String,
      default: "",
    },

    about: {
      type: String,
      default: "",
    },

    workPhotos: [
      {
        type: String,
      },
    ],

    isApproved: {
      type: Boolean,
      default: function () {
        return this.role === "worker" ? false : true;
      },
    },

    averageRating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    isActive: {
  type: Boolean,
  default: true,
},

    monthlySlots: {
      January: { type: Number, default: 0 },
      February: { type: Number, default: 0 },
      March: { type: Number, default: 0 },
      April: { type: Number, default: 0 },
      May: { type: Number, default: 0 },
      June: { type: Number, default: 0 },
      July: { type: Number, default: 0 },
      August: { type: Number, default: 0 },
      September: { type: Number, default: 0 },
      October: { type: Number, default: 0 },
      November: { type: Number, default: 0 },
      December: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);