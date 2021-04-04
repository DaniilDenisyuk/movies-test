import cn from "classnames";
import { useState, useEffect } from "react";
import { connect } from "redux";

const FilmLI = ({ className, title, year }) => (
  <li className={cn(className, "film-li")}>
    <h2 className="film-li__title">{title}</h2>
    <h3 className="film-li__year">{year}</h3>
    <button className="film-li__delete" value="Удалить фильм" />
  </li>
);

FilmLI = connect(null);

const FilmList = ({ className, films }) => {
  const filmItems = films.map((film, i) => (
    <FilmLI
      key={`film-item-${i}`}
      className="film-list__li"
      title={film.title}
      year={film.year}
    />
  ));
  return <ul className={cn(className, "film-list")}>{filmItems}</ul>;
};

const FilmPage = ({ films }) => {};

const mapState = (state) => state.films;

const mapDispatch = {};

export default connect(mapState)(FilmPage);
