const User = require("../models/User");
const Booking = require("../models/Booking");
const Review = require("../models/Review");

// Dashboard Statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({
      role: "customer",
    });

    const totalWorkers = await User.countDocuments({
      role: "worker",
    });

    const pendingWorkers = await User.countDocuments({
      role: "worker",
      isApproved: false,
    });

    const totalBookings =
      await Booking.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalWorkers,
        pendingWorkers,
        totalBookings,
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

// Get Pending Workers
const getPendingWorkers = async (
  req,
  res
) => {
  try {
    const workers = await User.find({
      role: "worker",
      isApproved: false,
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

// Get All Workers
const getAllWorkers = async (
  req,
  res
) => {
  try {
    const workers = await User.find({
      role: "worker",
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

const toggleWorkerStatus = async (req, res) => {
  try {
    const worker = await User.findById(req.params.id);

    console.log(
      "Before:",
      worker.name,
      worker.isActive
    );

    worker.isActive = !worker.isActive;

    await worker.save();

    console.log(
      "After:",
      worker.name,
      worker.isActive
    );

    res.status(200).json({
      success: true,
      isActive: worker.isActive,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name")
      .populate("worker", "name profession")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: "customer",
    }).select("-password");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Approve Worker
const approveWorker = async (
  req,
  res
) => {
  try {
    const worker =
      await User.findByIdAndUpdate(
        req.params.id,
        {
          isApproved: true,
        },
        {
          new: true,
        }
      ).select("-password");

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Worker approved successfully",
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

// Reject Worker
const rejectWorker = async (
  req,
  res
) => {
  try {
    const worker =
      await User.findByIdAndDelete(
        req.params.id
      );

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Worker rejected",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};






// Update Worker Slots
const updateWorkerSlots = async (
  req,
  res
) => {
  try {
    const { monthlySlots } = req.body;

    const worker = await User.findById(
      req.params.id
    );

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    worker.monthlySlots = monthlySlots;

    await worker.save();

    res.status(200).json({
      success: true,
      message: "Slots updated successfully",
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
  getPendingWorkers,
  getAllWorkers,
  getAllUsers,
  getAllReviews,
  toggleWorkerStatus,
  approveWorker,
  rejectWorker,
  updateWorkerSlots,
};