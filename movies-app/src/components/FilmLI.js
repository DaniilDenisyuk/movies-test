import cn from "classnames";
import { connect } from "react-redux";
import { removeFilm } from "../redux/actionCreators/films";
import { FilmInfoModal, ConfirmDeletionModal } from "./modals";
import { useState } from "react";

const FilmLI = ({ className, film, removeFilm }) => {
  const [infoOpened, setInfoOpened] = useState(false);
  const [confirmOpened, setConfirmOpened] = useState(false);
  return (
    <li className={cn(className, "film-li")}>
      <h2 className="film-li__title">{film.title}</h2>
      <h3 className="film-li__year">{film.releaseyear}</h3>
      <button className="film-li__info" onClick={() => setInfoOpened(true)}>
        Полная информация
      </button>
      <button
        className="film-li__delete"
        onClick={() => setConfirmOpened(true)}
      >
        Удалить фильм
      </button>
      {infoOpened && (
        <FilmInfoModal handleClose={() => setInfoOpened(false)} film={film} />
      )}
      {confirmOpened && (
        <ConfirmDeletionModal
          handleClose={() => setConfirmOpened(false)}
          onConfirm={() => {
            removeFilm(film.id);
            setConfirmOpened(false);
          }}
          onDecline={() => setConfirmOpened(false)}
        />
      )}
    </li>
  );
};

const mapDispatch = { removeFilm };

export default connect(null, mapDispatch)(FilmLI);
