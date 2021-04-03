import { Router } from "express";
import { readAll } from "../../dbAPI/rubrics/readAll.js";
import { readByKey } from "../../dbAPI/rubrics/readByKey.js";

const rubricsRoute = Router();

const getAllRubrics = (req, res) => {
  const db = req.app.get("db");
  readAll(db).then((result) => {
    res.send(result);
  });
};

const getRubricById = (req, res) => {
  const id = req.params.id;
  const db = req.app.get("db");
  readByKey(db, id).then((result) => {
    res.send(result);
  });
};

rubricsRoute.get("/", getAllRubrics);

rubricsRoute.get("/:id", getRubricById);

export default rubricsRoute;
