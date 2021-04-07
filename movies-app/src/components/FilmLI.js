import cn from "classnames";
import { connect } from "react-redux";
import { removeFilm } from "../redux/actionCreators/films";
import { FilmInfoModal } from "./FilmInfoModal";
import { useState } from "react";

const FilmLI = ({ className, film, removeFilm }) => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <li className={cn(className, "film-li")}>
      <h2 className="film-li__title">{film.title}</h2>
      <h3 className="film-li__year">{film.releaseYear}</h3>
      <button className="film-li__info" onClick={() => setModalOpened(true)}>
        Полная информация
      </button>
      <button className="film-li__delete" onClick={() => removeFilm(film.id)}>
        Удалить фильм
      </button>
      {modalOpened && (
        <FilmInfoModal handleClose={() => setModalOpened(false)} film={film} />
      )}
    </li>
  );
};

const mapDispatch = { removeFilm };

export default connect(null, mapDispatch)(FilmLI);
