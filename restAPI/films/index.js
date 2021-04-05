import { Router } from "express";
import { readAll, remove, create } from "../../dbAPI/films/index.js";

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

const createFilms = (req, res) => {
  const db = req.app.get("db");
  const films = req.body;
  const newFilms = films.map(async (film) => {
    film.id = await create(db, film);
    return film;
  });
  Promise.all(newFilms)
    .then((newFilms) => {
      console.log(newFilms);
      res.send(newFilms);
    })
    .catch((err) => {
      res.status(500).send("Something broke!");
      console.log(err.message);
    });
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
filmsRoute.post("/upload", createFilms);

filmsRoute.delete("/:id", deleteFilm);

export default filmsRoute;
