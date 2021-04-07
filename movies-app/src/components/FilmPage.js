import cn from "classnames";
import { connect } from "react-redux";
import FilmLI from "./FilmLI";
import FilmForm from "./modals/FilmForm";

import { useState, useEffect, useRef } from "react";

import {
  fetchFilms,
  postFilm,
  postFilms,
  setOrder,
  setSorting,
} from "../redux/actionCreators/films";

const FilmList = ({ className, films }) => {
  const filmItems = films.map((film, i) => (
    <FilmLI key={`film-item-${i}`} className="film-list__li" film={film} />
  ));
  return <ul className={cn(className, "film-list")}>{filmItems}</ul>;
};

const filterByKey = (list, key, value) =>
  list.filter((li) => li[key].toUpperCase().includes(value.toUpperCase()));

const sortByYear = (collection, order) => {
  const mapped = collection.map((v, i) => ({ i, value: v.releaseYear }));
  mapped.sort((a, b) => {
    const result = a.value - b.value;
    return order === "ASC" ? result : -result;
  });
  return mapped.map((v) => collection[v.i]);
};

const sortByTitle = (collection, order) => {
  const mapped = collection.map((v, i) => ({ i, value: v.title }));
  mapped.sort((a, b) => {
    const result = a.localeCompare(b, undefined, { sensitivity: "base" });
    return order === "ASC" ? result : -result;
  });
  return mapped.map((v) => collection[v.i]);
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
  const [filterValue, setFilterValue] = useState("");
  const [filterKey, setFilterKey] = useState("title");

  const filterFilms = () => filterByKey(films, filterKey, filterValue);

  const filtFilms = filterFilms();

  const modalRef = useRef();

  useEffect(() => {
    fetchFilms();
  }, [fetchFilms]);

  const closeForm = () => setFormOpened(false);

  const parseMoviesFile = (file) => {
    const reader = new FileReader();
    const fields = {
      title: "Title:",
      releaseYear: "Release Year:",
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

  const handleSubmit = (title, releaseYear, format, stars) => {
    postFilm({ title, releaseYear, format, stars });
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
      ) : (
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
          <div className="list__search search">
            <p className="search__heading">Искать фильм</p>
            <div className="row">
              <input
                className="search__input"
                onChange={(e) => {
                  setFilterValue(e.target.value);
                }}
              ></input>
              <button
                className="search__key"
                onClick={() => setFilterKey("title")}
              >
                По названию
              </button>
              <button
                className="search__key"
                onClick={() => setFilterKey("stars")}
              >
                По актерам
              </button>
            </div>
          </div>
          {filtFilms && filtFilms.length ? (
            <FilmList films={filtFilms} className="list__list" />
          ) : (
            "Таких фильмов нету"
          )}
        </section>
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
  const { sorting, order, list, isLoading } = state.films;
  const films = sorting(list, order);
  return { films, order, sorting, isLoading };
};

const mapDispatch = {
  fetchFilms,
  postFilm,
  postFilms,
  setOrder,
  setSorting,
};

export default connect(mapState, mapDispatch)(FilmPage);
