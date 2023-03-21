import express from "express";
import {
  createHamster,
  fetchAllHamsters,
  updateHamster,
} from "../service/hamsterService.js";
import multer from "multer";
import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename.slice(0, -19));

const uploadDir = __dirname + "/public/uploads/";
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];
console.log(__filename);
console.log(uploadDir);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    let fileType = file.mimetype.slice(6);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, req.body.name + "-" + uniqueSuffix + "." + fileType);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype));
  },
  limits: {
    fileSize: 1000000 * 5,
  },
});

const router = express.Router();

// Hämta alla hamsters
router.get("/hamster", async (req, res) => {
  const hamsters = await fetchAllHamsters();
  res.json(hamsters);
});

// Skapa ny hamster
router.post("/hamster", upload.single("file"), async (req, res) => {
  const fileName = req.file != null ? req.file.originalname : null;
  const hamster = req.body;
  hamster.img = "/public/uploads/" + req.file.filename;
  hamster.votes = 0;

  let result = undefined;

  try {
    result = await createHamster(hamster);
  } catch {}
  const responseData = {
    content: hamster,
    id: result._id,
    event: "Created new hamster",
  };
  console.log("hamster: ", responseData);
  let status = 201;
  res.status(status).json(responseData);
});

// Uppdatera hamster (rösta på)
router.put("/hamster", async (req, res) => {
  let hamster = req.body;

  const result = await updateHamster(hamster);
  let status = 200;
  const responseData = {
    content: hamster,
    event: "Updated hamster",
  };

  res.status(status).json(responseData);
});

// Ta bort todo
router.delete("/todo/:id", (req, res) => {});

export default router;
