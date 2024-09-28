import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import { time } from "console";

const app = express();
const port = 3000;
const posts = [];

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
  res.render("addMovie.ejs", {
    imagePath: null,
    title: null,
    rating: null,
    description: null,
  });
});

app.post("/uploadMovie", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.send("Error uploading file.");
    }
    const title = req.body["movieTitle"];
    const description = req.body.description;
    const rating = req.body.rating;
    console.log(req.body);
    if (!title || !description) {
      return res.send("Missing title or description");
    }

    const imagePath = `uploads/${req.file.filename}`;
    posts.push({
      title: title,
      description: description,
      rating: rating,
      imagePath: imagePath,
    });

    res.render("index.ejs", {
      posts: posts,
    });
  });
});
app.listen(port, () => {
  console.log(`Listening to server on port ${port}`);
});
