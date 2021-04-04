import cn from "classnames";
import { connect } from "redux";
import FilmLI from "./FilmLI";

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

  if (sorting) {
    films.sort(sorting);
  }

  useEffect(() => {
    fetchFilms();
  }, []);

  return (
    <div className="films">
      <section className="films-list">
        <h3 className="films-list__heading">Список фильмов: </h3>
        {films && films.length ? (
          <FilmList films={films} className="films-list__list" />
        ) : (
          "Фильмов ещё нету"
        )}
        <button className="films-list__add-film" value="" />
        <div className="films-list__sorting sorting">
          <button
            className="sorting__name"
            value="Сортировать по алфавиту"
            onClick={() => setSorting(sortByName)}
          />
          <button
            className="sorting__year"
            value="Сортировать по годам"
            onClick={() => setSorting(sortByYear)}
          />
          <button
            className="sorting__asc"
            value="&uarr;"
            onClick={() => setSorting(sorting.bind(null, true))}
          />
          <button
            className="sorting__desc"
            value="&darr;"
            onClick={() => setSorting(sorting.bind(null, false))}
          />
        </div>
        <button className="films-list__add-film" value="Добавить фильм" />
        <label className="films-list__file">
          <input name="myFile" type="file" accept=".txt" />
          Загрузить фильмы с файла
        </label>
      </section>
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
