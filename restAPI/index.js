import express from "express";
import filmsRoute from "./films/index.js";
import Database from "../dbAPI/database.js";
import dbConf from "../config/db.js";
import cors from "cors";

const port = process.env.PORT || 3005;

const app = express();

//app.use(express.static(path.join(__dirname, "build")));

app.use(cors());

// app.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/films", filmsRoute);
app.set("db", new Database(dbConf));

app.listen(port, () => {
  console.log(`Rest api for test listening at http://localhost:${port}`);
});
