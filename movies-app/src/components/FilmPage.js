import cn from "classnames";
import { connect } from "react-redux";
import FilmLI from "./FilmLI";
import FilmForm from "./FilmFormModal";

import { useState, useEffect } from "react";

import {
  fetchFilms,
  postFilm,
  postFilmsFile,
  setOrder,
  setSorting,
} from "../redux/actionCreators/films";

import { sortFilms } from "../redux/selectors";

const FilmList = ({ className, films }) => {
  const filmItems = films.map((film, i) => (
    <FilmLI
      key={`film-item-${i}`}
      className="film-list__li"
      id={film.id}
      title={film.title}
      year={film.year}
    />
  ));
  return <ul className={cn(className, "film-list")}>{filmItems}</ul>;
};

const sortByYear = (order) => (a, b) => {
  if (order === "ASC") {
    return a.year - b.year;
  } else {
    return b.year - a.year;
  }
};

const sortByTitle = (order) => (a, b) => {
  const aName = a.title.toUpperCase();
  const bName = b.title.toUpperCase();
  if (order === "ASC") {
    if (aName < bName) {
      return -1;
    }
    if (aName > bName) {
      return 1;
    }
  } else {
    if (aName > bName) {
      return -1;
    }
    if (aName < bName) {
      return 1;
    }
  }
  return 0;
};

const FilmPage = ({ films, fetchFilms, postFilm, postFilmsFile }) => {
  const [fileChosen, setFileChosen] = useState(false);
  const [formOpened, setFormOpened] = useState(false);

  useEffect(() => {
    fetchFilms();
  }, [fetchFilms]);

  const handleSubmit = (e) => {
    postFilm();
    setFormOpened(false);
  };

  return (
    <div className="films">
      <section className="films__list list">
        <h3 className="list__heading">Список фильмов: </h3>
        <div className="list__sorting sorting">
          <button
            className="sorting__name"
            onClick={() => setSorting(sortByTitle)}
          >
            По алфавиту
          </button>
          <button
            className="sorting__year"
            value=""
            onClick={() => setSorting(sortByYear)}
          >
            По годам
          </button>
          <button className="sorting__asc" onClick={() => setOrder("ASC")}>
            &uarr;
          </button>
          <button className="sorting__desc" onClick={() => setOrder("DESC")}>
            &darr;
          </button>
        </div>

        {films && films.length ? (
          <FilmList films={films} className="list__list" />
        ) : (
          "Фильмов ещё нету"
        )}
      </section>
      {formOpened && (
        <FilmForm className="films__film-modal" handleSubmit={handleSubmit} />
      )}
      <div className="row">
        <button className="films__add-film" onClick={() => setFormOpened(true)}>
          Добавить фильм
        </button>
        <div className="films__add-file">
          <label>
            <input
              name="film-file"
              type="file"
              accept=".txt"
              onChange={(e) => {
                setFileChosen(e.target.uploadFile.files[0]);
              }}
            />
            Загрузить фильмы с файла
          </label>
          {fileChosen && (
            <button type="submit" onClick={() => postFilmsFile(fileChosen)}>
              Подтвердить
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => {
  const { sorting, order } = state;
  const films = sortFilms(state, sorting, order);
  return { films };
};
const mapDispatch = {
  fetchFilms,
  postFilm,
  postFilmsFile,
  setOrder,
  setSorting,
};

export default connect(mapState, mapDispatch)(FilmPage);
