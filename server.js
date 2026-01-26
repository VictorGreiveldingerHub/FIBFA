require("dotenv").config();
const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

const app = express();

const router = require("./app/router");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // JWT
  }),
);

// Pour parser le body, à placer avant le router ....
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
