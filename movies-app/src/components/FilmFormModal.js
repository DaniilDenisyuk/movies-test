import { useState } from "react";
import cn from "classnames";

const FilmFormModal = ({ className, handleSubmit }) => {
  const [isValid, setIsValid] = useState(false);
  const [title, setTitle] = useState({
    isPristine: true,
    isValid: true,
    validations: [],
    value: "",
  });
  const [format, setFormat] = useState({
    isPristine: true,
    isValid: true,
    validations: [],
    value: "",
  });
  const [stars, setStars] = useState({
    isPristine: true,
    isValid: true,
    validations: [],
    value: "",
  });
  const [year, setYear] = useState({
    isPristine: true,
    isValid: true,
    validations: [],
    value: "",
  });
  return (
    <div className={cn(className, "film-modal")}>
      <form onSubmit={(e) => handleSubmit()} className="film-modal__form">
        <p className="film-modal__heading">
          Заполните форму,
          <br />
          что бы добавить фильм
        </p>
        <input
          type="text"
          placeholder="Название"
          className="film-modal__input"
          onChange={(e) => {
            title.value = e.target.value;
          }}
          onBlur={() => {
            title.isPristine = false;
          }}
        />
        <input
          type="number"
          placeholder="Год выпуска"
          className="film-modal__input"
          onChange={(e) => {
            year.value = e.target.value;
          }}
          onBlur={() => {
            setYear({ ...year, isPristine: false });
          }}
        />
        <input
          type="text"
          placeholder="Формат"
          className="film-modal__input"
          onChange={(e) => {
            format.value = e.target.value;
          }}
          onBlur={() => {
            setFormat({ ...format, isPristine: false });
          }}
        />
        <input
          type="text"
          placeholder="Актёры"
          className="film-modal__input"
          onChange={(e) => {
            stars.value = e.target.value;
          }}
          onBlur={() => {
            setStars({ ...stars, isPristine: false });
          }}
        />
        <button type="submit" className="film-modal__submit">
          Подтвердить
        </button>
      </form>
    </div>
  );
};

export default FilmFormModal;
