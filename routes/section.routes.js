const { Router } = require("express");
const ObjectID = require("mongodb").ObjectID;
const Section = require("../models/Section");
const auth = require("../middleware/auth.middleware");
const router = Router();
const { Types } = require("mongoose");

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

    res.json(singleSection);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "Something went wrong in /edit", error: e });
  }
});

router.post("/edit-order", auth, async (req, res) => {
  try {
    const writeOperations = req.body.map((item) => {
      return {
        updateOne: {
          filter: { _id: item._id },
          update: { order: item.order },
        },
      };
    });

    const response = await Section.bulkWrite(writeOperations);
    res.json(response);
  } catch (e) {
    console.table(e);
    res
      .status(500)
      .json({ message: "Something went wrong in /edit-order", error: e });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const sections = await Section.find({ owner: req.user.userId });

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

router.delete("/:id", auth, async (req, res) => {
  try {
    const deleteSection = await Section.findByIdAndDelete(req.params.id);
    res.json(deleteSection);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong in section/delete" });
  }
});
module.exports = router;
