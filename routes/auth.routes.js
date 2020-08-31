const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = Router();

// /api/auth/register
router.post("/register", async (req, res) => {
  try {
    console.log("Body", req.body);
    const { email, password } = req.body;

    const candidate = await User.findOne();
    console.log(candidate);

    if (candidate) {
      return res
        .status(400)
        .json({ message: "User already exist. Please login" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPassword });

    await user.save();

    const token = jwt.sign({ userID: user.id }, config.get("jwtSecret"), {
      expiresIn: "1h",
    });

    res.json({ token, userId: user.id });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong :( try again." });
  }
});

// /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "password incorrect" });
    }

    const token = jwt.sign({ userID: user.id }, config.get("jwtSecret"), {
      expiresIn: "1h",
    });

    res.json({ token, userId: user.id });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong :( try again." });
  }
});

module.exports = router;
