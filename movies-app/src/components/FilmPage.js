import cn from "classnames";
import { connect } from "react-redux";
import FilmLI from "./FilmLI";
import { testFilms } from "../shared/testFilms";

import { useState, useEffect } from "react";

import {
  fetchFilms,
  postFilm,
  postFilmsFile,
} from "../redux/actionCreators/films";

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

const sortByYear = (asc, a, b) => {
  if (asc) {
    return a.year - b.year;
  } else {
    return b.year - a.year;
  }
};

const sortByName = (asc, a, b) => {
  const aName = a.name.toUpperCase();
  const bName = b.name.toUpperCase();
  if (asc === true) {
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
  const [sorting, setSorting] = useState(null);
  const [fileChosen, setFileChosen] = useState(false);
  const [formOpened, setFormOpened] = useState(false);
  const [filmForm, setFilmForm] = useState({
    title: {
      isPristine: true,
      isValid: true,
      value: "",
    },
    year: {
      isPristine: true,
      isValid: true,
      value: "",
    },
    format: {
      isPristine: true,
      isValid: true,
      value: "",
    },
    stars: {
      isPristine: true,
      isValid: true,
      value: "",
    },
  });

  if (sorting) {
    films.sort(sorting);
  }

  // useEffect(() => {
  //   fetchFilms();
  // }, []);

  const handleSubmit = (e) => {
    postFilm();
    setFormOpened(false);
  };

  return (
    <div className="films">
      <section className="films__list list">
        <h3 className="list__heading">Список фильмов: </h3>
        {films && films.length ? (
          <FilmList films={films} className="list__list" />
        ) : (
          "Фильмов ещё нету"
        )}
        <div className="list__sorting sorting">
          <button
            className="sorting__name"
            onClick={() => setSorting(sortByName)}
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
          <button
            className="sorting__asc"
            onClick={() => setSorting(sorting.bind(null, true))}
          >
            &uarr;
          </button>
          <button
            className="sorting__desc"
            onClick={() => setSorting(sorting.bind(null, false))}
          >
            &darr;
          </button>
        </div>
      </section>
      {formOpened && (
        <div className="films__film-modal film-modal">
          <form onSubmit={handleSubmit} className="film-modal__form">
            <p className="film-modal__heading">
              Заполните форму,
              <br />
              что бы добавить фильм
            </p>
            <input
              type="text"
              placeholder="Название"
              className="film-modal__input"
            />
            <input
              type="number"
              placeholder="Год выпуска"
              className="film-modal__input"
            />
            <input
              type="text"
              placeholder="Формат"
              className="film-modal__input"
            />
            <input
              type="text"
              placeholder="Актёры"
              className="film-modal__input"
            />
            <button type="submit" className="film-modal__submit">
              Подтвердить
            </button>
          </form>
        </div>
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

const mapState = (state) => ({ films: state.films });
const mapDispatch = {
  fetchFilms,
  postFilm,
  postFilmsFile,
};

export default connect(mapState, mapDispatch)(FilmPage);
