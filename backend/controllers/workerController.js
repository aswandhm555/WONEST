const User = require("../models/User");
const Booking = require("../models/Booking");
const Review = require("../models/Review");

// Worker Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    const workerId = req.user.id;

    const totalWorks = await Booking.countDocuments({
      worker: workerId,
    });

    const pendingWorks =
      await Booking.countDocuments({
        worker: workerId,
        status: "pending",
      });

    const completedWorks =
      await Booking.countDocuments({
        worker: workerId,
        status: "completed",
      });

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);

    tomorrow.setDate(
      tomorrow.getDate() + 1
    );

    const todayBookings =
      await Booking.countDocuments({
        worker: workerId,
        bookingDate: {
          $gte: today,
          $lt: tomorrow,
        },
      });

    const worker = await User.findById(
      workerId
    );

    res.status(200).json({
      success: true,
      stats: {
        totalWorks,
        pendingWorks,
        completedWorks,
        todayBookings,
        averageRating:
          worker.averageRating,
        totalReviews:
          worker.totalReviews,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// Get All Approved Workers
const getWorkers = async (req, res) => {
  try {
   const workers = await User.find({
  role: "worker",
  isApproved: true,
  isActive: true,
}).select("-password");


    res.status(200).json({
      success: true,
      workers,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Worker Profile
const getWorkerProfile = async (req, res) => {
  try {
    const worker = await User.findById(
      req.user.id
    ).select("-password");

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    res.status(200).json({
      success: true,
      worker,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update Worker Profile
const updateWorkerProfile = async (
  req,
  res
) => {
  try {
    const {
      name,
      phone,
      profession,
      experience,
      place,
      about,
    } = req.body;

    const worker =
      await User.findByIdAndUpdate(
        req.user.id,
        {
          name,
          phone,
          profession,
          experience,
          place,
          about,
        },
        {
          new: true,
        }
      ).select("-password");

    res.status(200).json({
      success: true,
      message:
        "Profile updated successfully",
      worker,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Search Workers
const searchWorkers = async (
  req,
  res
) => {
  try {
    const { profession, place, rating } = req.query;

const filter = {
  role: "worker",
  isApproved: true,
  isActive: true,
};

   if (profession) {
  filter.profession = {
    $regex: profession,
    $options: "i",
  };
}

if (place) {
  filter.place = {
    $regex: place,
    $options: "i",
  };
}

if (rating) {
  filter.averageRating = {
    $gte: Number(rating),
  };
}

const workers = await User.find(filter)
  .select("-password");

    res.status(200).json({
      success: true,
      workers,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const getWorkerReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      worker: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({ reviews });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get Single Worker
const getWorkerById = async (
  req,
  res
) => {
  try {
const worker = await User.findOne({
  _id: req.params.id,
  role: "worker",
  isApproved: true,
  isActive: true,
}).select("-password");

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    res.status(200).json({
      success: true,
      worker,
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
  getDashboardStats,
  getWorkers,
  getWorkerProfile,
  updateWorkerProfile,
  searchWorkers,
  getWorkerById,
  getWorkerReviews,
};