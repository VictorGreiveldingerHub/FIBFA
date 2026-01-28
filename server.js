require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000;

const app = express();

const router = require("./app/router");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(
  session({
    name: process.env.SESSION_NAME || "fibfa.sid",
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: true, // docker issues si false
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: Number(process.env.SESSION_MAX_AGE) || 1000 * 60 * 60, // 1h
    },
  }),
);

// Pour parser le body, à placer avant le router ....
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
  console.log(`Serveur FIBFA à l'écoute sur le port : ${PORT}`);
});
