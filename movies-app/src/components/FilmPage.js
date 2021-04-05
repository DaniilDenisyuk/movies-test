import cn from "classnames";
import { connect } from "react-redux";
import FilmLI from "./FilmLI";
import FilmForm from "./FilmFormModal";

import { useState, useEffect, useRef } from "react";

import {
  fetchFilms,
  postFilm,
  postFilms,
  setOrder,
  setSorting,
} from "../redux/actionCreators/films";

import { sortFilms } from "../redux/selectors";

const FilmList = ({ className, films }) => {
  const filmItems = films.map((film, i) => (
    <FilmLI key={`film-item-${i}`} className="film-list__li" film={film} />
  ));
  return <ul className={cn(className, "film-list")}>{filmItems}</ul>;
};

const sortByYear = (order) => (a, b) => {
  if (order === "ASC") {
    return a.release_year - b.release_year;
  } else {
    return b.release_year - a.release_year;
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

const FilmPage = ({
  films,
  isLoading,
  fetchFilms,
  postFilm,
  postFilms,
  setOrder,
  setSorting,
}) => {
  const [fileChosen, setFileChosen] = useState(null);
  const [formOpened, setFormOpened] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    fetchFilms();
  }, [fetchFilms]);

  const closeForm = () => setFormOpened(false);

  const parseMoviesFile = (file) => {
    const reader = new FileReader();
    const fields = {
      title: "Title:",
      release_year: "Release Year:",
      format: "Format:",
      stars: "Stars:",
    };
    return new Promise((resolve, reject) => {
      reader.readAsText(file);
      reader.onload = function () {
        const content = reader.result;
        const films = content.split("\n\n").map(async (filmStr) => {
          const film = {};
          const filmFields = filmStr.split("\n");
          for (const [key, str] of Object.entries(fields)) {
            filmFields.forEach((field) => {
              if (field.startsWith(str)) {
                film[key] = field.replace(str, "").trim();
              }
            });
          }
          return film;
        });
        Promise.all(films)
          .then((films) => resolve(films))
          .catch((e) => reject(e));
      };
    });
  };

  const handleSubmit = (title, release_year, format, stars) => {
    postFilm({ title, release_year, format, stars });
    setFormOpened(false);
  };

  const handleFileSubmit = async () => {
    try {
      const films = await parseMoviesFile(fileChosen);
      postFilms(films);
      setFileChosen(null);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="films">
      {isLoading ? (
        "идет загрузка..."
      ) : films && films.length ? (
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
          <FilmList films={films} className="list__list" />
        </section>
      ) : (
        "Фильмов ещё нету"
      )}
      {formOpened && (
        <div ref={modalRef}>
          <FilmForm
            className="films__film-modal"
            handleClose={closeForm}
            handleSubmit={handleSubmit}
          />
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
                setFileChosen(e.target.files[0]);
              }}
            />
            Загрузить фильмы с файла
          </label>
          {fileChosen && (
            <div className="row films__submit-file">
              <p>{fileChosen.name}</p>
              <button type="submit" onClick={() => handleFileSubmit()}>
                Подтвердить
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => {
  const { sorting, order } = state.films;
  const films = sortFilms(state, sorting, order);
  return { films, order, sorting, isLoading: state.films.isLoading };
};

const mapDispatch = {
  fetchFilms,
  postFilm,
  postFilms,
  setOrder,
  setSorting,
};

export default connect(mapState, mapDispatch)(FilmPage);
