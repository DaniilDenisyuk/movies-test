import { Router } from "express";
import { readAll, remove, create } from "../../dbAPI/films/index.js";
import { readRecords } from "../../utils/readRecords.js";

const filmsRoute = Router();

const getAllFilms = (req, res) => {
  const db = req.app.get("db");
  readAll(db)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send("Something broke!");
      console.log(err.message);
    });
};

const createFilm = (req, res) => {
  const db = req.app.get("db");
  const film = req.body;
  create(db, film)
    .then((insertedId) => {
      res.send(insertedId.toString());
    })
    .catch((err) => {
      res.status(500).send("Something broke!");
      console.log(err.message);
    });
};

const createFilmsFromFile = (req, res) => {
  const db = req.app.get("db");
  const file = JSON.parse(req.body.file);
  console.log(file);
  // create(db).then((result) => {
  //   res.send(result);
  // });
};

const deleteFilm = (req, res) => {
  const id = req.params.id;
  const db = req.app.get("db");
  remove(db, id)
    .then((remId) => {
      res.send(remId.toString());
    })
    .catch((err) => {
      res.status(500).send("Something broke!");
      console.log(err.message);
    });
};

filmsRoute.get("/", getAllFilms);

filmsRoute.post("/", createFilm);
filmsRoute.post("/upload", createFilmsFromFile);

filmsRoute.delete("/:id", deleteFilm);

export default filmsRoute;
