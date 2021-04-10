import cn from "classnames";
import { connect } from "react-redux";
import FilmLI from "./FilmLI";
import { FilmFormModal } from "./modals";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ToastMessage.scss";

import { useState, useEffect, useRef } from "react";

import {
  fetchFilms,
  postFilm,
  postFilmsFile,
  setOrder,
  setSorting,
} from "../redux/actionCreators/films";

const filterByKey = (list, key, value) =>
  list.filter((li) => li[key].toUpperCase().includes(value.toUpperCase()));

const sortByYear = (collection, order) => {
  const mapped = collection.map((v, i) => ({ i, value: v.releaseyear }));
  mapped.sort((a, b) => {
    const result = a.value - b.value;
    return order === "ASC" ? result : -result;
  });
  return mapped.map((v) => collection[v.i]);
};

const sortByTitle = (collection, order) => {
  const mapped = collection.map((v, i) => ({ i, value: v.title }));
  mapped.sort((a, b) => {
    const result = a.value.localeCompare(b.value, undefined, {
      sensitivity: "base",
    });
    return order === "ASC" ? result : -result;
  });
  return mapped.map((v) => collection[v.i]);
};

const FilmList = ({ className, films }) => {
  const filmItems = films.map((film, i) => (
    <FilmLI key={`film-item-${i}`} className="film-list__li" film={film} />
  ));
  return <ul className={cn(className, "film-list")}>{filmItems}</ul>;
};

const FilmPage = ({
  films,
  isLoading,
  fetchFilms,
  postFilm,
  postFilmsFile,
  setOrder,
  setSorting,
  message,
}) => {
  const [fileChosen, setFileChosen] = useState(null);
  const [formOpened, setFormOpened] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [filterKey, setFilterKey] = useState("title");

  const filterFilms = () => filterByKey(films, filterKey, filterValue);

  const filtFilms = filterFilms();

  const modalRef = useRef();
  useEffect(() => {
    const { text, type } = message;
    if (!text) return;
    let appearance = "";
    switch (type) {
      case 0:
        appearance = "error";
        break;
      case 1:
        appearance = "success";
        break;
      case 2:
        appearance = "info";
        break;
      default:
        appearance = "info";
        break;
    }
    toast(text, {
      className: cn("toast-message", {
        "toast-message--error": appearance === "error",
        "toast-message--success": appearance === "success",
        "toast-message--info": appearance === "info",
      }),
    });
  }, [message]);

  useEffect(() => {
    fetchFilms();
  }, [fetchFilms]);

  const closeForm = () => setFormOpened(false);

  const handleSubmit = (title, releaseyear, format, stars) => {
    postFilm({ title, releaseyear, format, stars });
    setFormOpened(false);
  };

  const handleFileSubmit = () => {
    postFilmsFile(fileChosen);
    setFileChosen(null);
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
          <FilmFormModal
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
                const file = e.target.files[0];
                if (file.size === 0) {
                  alert("Файл не может быть пустым");
                } else {
                  setFileChosen(e.target.files[0]);
                }
              }}
            />
            Загрузить фильмы с файла
          </label>
          {fileChosen && (
            <div className="row films__submit-file">
              <p>{fileChosen.name}</p>
              <button type="submit" onClick={handleFileSubmit}>
                Подтвердить
              </button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

const mapState = (state) => {
  const { sorting, order, list, isLoading, message } = state.films;
  const films = sorting ? sorting(list, order) : list;
  return { films, order, sorting, isLoading, message };
};

const mapDispatch = {
  fetchFilms,
  postFilm,
  postFilmsFile,
  setOrder,
  setSorting,
};

export default connect(mapState, mapDispatch)(FilmPage);
