import express from "express";
import rubricsRoute from "./rubrics/index.js";
import Database from "../dbAPI/database.js";
import dbConf from "../config/db.js";
const port = 3000;

const app = express();

app.use("/rubrics", rubricsRoute);
app.set("db", new Database(dbConf));

app.listen(port, () => {
  console.log(`Rest api for test listening at http://localhost:${port}`);
});
