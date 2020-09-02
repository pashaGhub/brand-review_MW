const { Router } = require("express");
const User = require("../models/User");
const Section = require("../models/Section");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/create", auth, async (req, res) => {
  try {
    const newSection = new Section({ ...req.body, owner: req.user.userId });

    await newSection.save();
    res.status(201).json(newSection);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong in /create" });
  }
});

router.post("/edit", auth, async (req, res) => {
  try {
    const singleSection = await Section.findByIdAndUpdate(
      req.body._id,
      req.body
    );
    console.log(singleSection);

    res.json(singleSection);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong in /edit" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const sections = await Section.find({ owner: req.user.userId });
    console.log(req.user.userId);
    res.json(sections);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong in /" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const singleSection = await Section.findById(req.params.id);
    res.json(singleSection);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong in /:id" });
  }
});

module.exports = router;
