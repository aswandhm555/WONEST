const Booking = require("../models/Booking");
const createBooking = async (req, res) => {
  try {
    const {
      worker,
      slotMonth,
      slotNumber,
      address,
    } = req.body;

    const existingBooking =
      await Booking.findOne({
        worker,
        slotMonth,
        slotNumber,
      });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "Slot already booked",
      });
    }

    const booking = await Booking.create({
      user: req.user.id,
      worker,
      slotMonth,
      slotNumber,
      address,
    });

    res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getMyBookings = async (
  req,
  res
) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
    })
      .populate("worker", "name profession")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getWorkerBookings = async (
  req,
  res
) => {
  try {
    const bookings = await Booking.find({
      worker: req.user.id,
    })
      .populate("user", "name phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const acceptBooking = async (
  req,
  res
) => {
  try {
    const booking =
      await Booking.findByIdAndUpdate(
        req.params.id,
        {
          status: "accepted",
        },
        {
          new: true,
        }
      );

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const completeBooking = async (req, res) => {
  try {
    const booking =
      await Booking.findByIdAndUpdate(
        req.params.id,
        {
          status: "completed",
        },
        { new: true }
      );

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking =
      await Booking.findByIdAndUpdate(
        req.params.id,
        {
          status: "cancelled",
        },
        { new: true }
      );

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const rejectBooking = async (req, res) => {
  try {
    const booking =
      await Booking.findByIdAndUpdate(
        req.params.id,
        {
          status: "rejected",
        },
        {
          new: true,
        }
      );

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


module.exports = {
  createBooking,
  getMyBookings,
  getWorkerBookings,
  acceptBooking,
  rejectBooking,
  completeBooking,
  cancelBooking,
};