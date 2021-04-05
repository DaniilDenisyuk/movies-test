import { useRef } from "react";
import cn from "classnames";
import { useClickOutside } from "../hooks/useClickOutside";
export const FilmInfoModal = ({ className, film, handleClose }) => {
  const modalRef = useRef();
  useClickOutside(modalRef, handleClose);
  return (
    <div className={cn(className, "film-modal")}>
      <div ref={modalRef} className="film-modal__wrapper film-info">
        <p className="film-modal__heading">Информация о фильме</p>
        <span
          className="film-modal__close"
          onClick={() => handleClose()}
        ></span>
        <h3 className="row">
          <span className="film-info__heading">Название:</span>
          {film.title}
        </h3>
        <h3 className="row">
          <span className="film-info__heading">Год выпуска:</span>
          {film.release_year}
        </h3>
        <h3 className="row">
          <span className="film-info__heading">Формат:</span>
          {film.format}
        </h3>
        <h3 className="row">
          <span className="film-info__heading">Актеры:</span>
          {film.stars}
        </h3>
      </div>
    </div>
  );
};
