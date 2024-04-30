require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./db/connection");
const app = express();

const port = process.env.APP_PORT || 5000;
app.use(express.json(), bodyParser.text(), cors());

// router
app.use(require("./routes/index.routes"));

connection(process.env.MONGO_URI).then(() => {
  console.log("connected to database ✅");
});

app.listen(port, () => {
  console.clear();
  console.log(`app server is running on port: http://localhost:${port} ✅`);
});
