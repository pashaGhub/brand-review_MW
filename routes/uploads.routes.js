const { Router } = require("express");
const { Types } = require("mongoose");
const Uploads = require("../models/Uploads");
const auth = require("../middleware/auth.middleware");
const multer = require("multer");
const router = Router();
const fs = require("fs");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const imgFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const videoFilter = (req, file, cb) => {
  if (file.mimetype === "video/mp4") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadImg = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 15,
  },
  fileFilter: imgFilter,
});

const uploadVideo = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 100,
  },
  fileFilter: videoFilter,
});

//img routes
router.post("/img", auth, uploadImg.array("files", 12), async (req, res) => {
  console.log(uploadImg);
  Promise.all(
    req.files.map(async (file) => {
      const newUpload = new Uploads({
        _id: new Types.ObjectId(),
        path: file.path,
        owner: req.user.userId,
      });

      return await newUpload.save();
    })
  )
    .then(res.status(201).json("files successfully uploaded"))
    .catch((e) => {
      res
        .status(500)
        .json({ message: "Something went wrong in /uploads/img", error: e });
    });
});

router.get("/img", auth, async (req, res) => {
  try {
    const getImg = await Uploads.find({ owner: req.user.userId });
    const filterImgs = await getImg.filter(
      (img) => img.path.split(".")[1] !== "mp4"
    );

    res.json(filterImgs);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong in get uploads/img" });
  }
});

//video routes
router.post("/video", auth, uploadVideo.single("file"), async (req, res) => {
  try {
    const newUpload = new Uploads({
      _id: new Types.ObjectId(),
      path: req.file.path,
      owner: req.user.userId,
    });

    await newUpload.save();
    res.status(201).json(newUpload);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "Something went wrong in /uploads/img", error: e });
  }
});

router.get("/videos", auth, async (req, res) => {
  try {
    const getVideos = await Uploads.find({ owner: req.user.userId });
    const filterVideos = await getVideos.filter(
      (img) => img.path.split(".")[1] === "mp4"
    );

    res.json(filterVideos);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong in get uploads/img" });
  }
});

//common routes
router.delete("/:id", auth, async (req, res) => {
  try {
    const item = await Uploads.findByIdAndDelete(req.params.id);
    fs.unlinkSync(item.path);
    res.status(201).json({ message: "File successfully deleted!" });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "Something went wrong in get delete file" });
  }
});

module.exports = router;
