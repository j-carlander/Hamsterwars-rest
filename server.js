import express from "express";
import router from "./src/router/router.js";
import cors from "cors";
import multer from "multer";
import path from "path";
import url from "url";

const addr = "127.0.0.1";
const port = 5000;

const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = __dirname + "/public/uploads/";
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];

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

app.use("/public", express.static("public"));

app.use(cors());
app.use(express.json()); // <-- in-data går från json till javascript-objekt
// app.use(express.urlencoded({ extended: true }));

// Actutor (en endpoint för att se om allt fungerar)
app.get("/health", (req, res) => {
  res.status(200).json({ state: "server is up and running" });
  console.log("server is up");
});

app.use("/api", router); //<-- alla url med api ...:3000/api/....

app.post("/upload_files", upload.single("file"), async (req, res) => {
  const fileName = req.file != null ? req.file.originalname : null;
  const hamster = req.body;
  hamster.img = "/public/uploads/" + req.file.filename;
  hamster.votes = 0;
  console.log("hamster: ", hamster);
  console.log("file and filname: ", req.file, fileName);

  try {
  } catch {}

  res.json({ message: "Successfully uploaded file: " + fileName });
});

app.get("/public/images/:id", (req, res) => {
  res.status(200);
});

app.get("*", (req, res) => {
  let error = new Error();
  error.serverInfo = "Path not resolved";
  error.clientInfo = "The url that you used is not valid";
  res.status(404);
  throw error; // Kasta felet till express
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
