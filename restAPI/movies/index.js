import { Router } from "express";
import { readFile } from "fs/promises";
import { parseMovies } from "../../utils/parseMovies.js";
import {
  readAll,
  removeById,
  create,
  createBunch,
} from "../../dbAPI/movie/index.js";
import multer from "multer";

const DIR = "./uploads/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "text/plain" || file.mimetype == "text/csv") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .txt and .csv format allowed!"));
    }
  },
});

const moviesRoute = Router();

const getAllFilms = (req, res) => {
  const db = req.app.get("db");
  readAll(db)
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Cannot get films" + err.message });
    });
};

const createFilm = (req, res) => {
  const db = req.app.get("db");
  const { title, format, releaseyear, stars } = req.body;
  const movie = { movie: { title, releaseyear, format }, actor: stars };
  create(db, movie)
    .then((insertedId) => {
      res.send(insertedId);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Cannot create film " + err.message });
    });
};

const uploadFilms = (req, res) => {
  const db = req.app.get("db");
  const { path } = req.file;
  readFile(path, { encoding: "utf-8" })
    .then((content) => parseMovies(content))
    .then((movies) => {
      const bunch = movies.map(({ title, releaseyear, format, stars }) => ({
        movie: { title, releaseyear, format },
        actor: stars,
      }));
      return createBunch(db, bunch).then(() => {
        res.status(201).send({ message: "File succesfully uploaded" });
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ error: "Cannot upload your file: " + e.message });
    });
};

const deleteFilm = (req, res) => {
  const id = req.params.id;
  const db = req.app.get("db");
  removeById(db, id)
    .then((id) => {
      res.send({ message: "Film succesfully deleted", id });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "Cannot delete given film: " + err.message });
    });
};

const getFilmById = (req, res) => {};

moviesRoute.get("/", getAllFilms);
moviesRoute.get("/:id", getFilmById);

moviesRoute.post("/", createFilm);
moviesRoute.post("/upload", upload.single("file"), uploadFilms);

moviesRoute.delete("/:id", deleteFilm);

export default moviesRoute;
