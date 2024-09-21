import express from "express";
import bodyParser from "body-parser";

app.use(bodyParser.urlencoded({ extended: true }));

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Listening to server on port ${port}`);
});
