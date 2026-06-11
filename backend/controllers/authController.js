const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
const register = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      role,
      profession,
      experience,
      place,
      about,
    } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const photos = req.files
      ? req.files.map(
          (file) => file.filename
        )
      : [];

    await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,

      profession:
        role === "worker"
          ? profession
          : undefined,

      experience:
        role === "worker"
          ? experience
          : undefined,

      place:
        role === "worker"
          ? place
          : undefined,

      about:
        role === "worker"
          ? about
          : undefined,

      workPhotos:
        role === "worker"
          ? photos
          : [],
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};




// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find User
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }

    // Check Password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // Worker approval check
    if (
      user.role === "worker" &&
      !user.isApproved
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Waiting for admin approval",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
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

module.exports = {
  register,
  login,
};
