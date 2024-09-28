import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, //sets the size of image to be less than 5mb
}).single("image");

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/create", (req, res) => {
  res.render("addMovie.ejs", { imagePath: null });
});

app.post("/uploadImage", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.send("Error uploading file.");
    }

    const imagePath = `uploads/${req.file.filename}`;
    console.log("aldfa" + imagePath);
    console.log("My name is someone");

    res.render("addMovie.ejs", { imagePath: imagePath });
  });
});
app.listen(port, () => {
  console.log(`Listening to server on port ${port}`);
});
