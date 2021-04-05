import express from "express";
import filmsRoute from "./films/index.js";
import Database from "../dbAPI/database.js";
import dbConf from "../config/db.js";
import cors from "cors";

const port = 3005;

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
  // console.log("Request:", req.originalUrl, req.method, req.body);
  next();
});

app.use("/films", filmsRoute);
app.set("db", new Database(dbConf));

app.listen(port, () => {
  console.log(`Rest api for test listening at http://localhost:${port}`);
});
