const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  register,
  login,
} = require("../controllers/authController");

router.post(
  "/register",
  upload.array("workPhotos", 3),
  register
);

router.post("/login", login);

module.exports = router;