import { useState, useRef } from "react";
import cn from "classnames";
import { required, number } from "../shared/validations";
import { useClickOutside } from "../hooks/useClickOutside";

const FilmFormModal = ({ className, handleSubmit, handleClose }) => {
  const formRef = useRef();
  const [title, setTitle] = useState({
    isPristine: true,
    isValid: false,
    validations: [required],
    value: "",
  });
  const [format, setFormat] = useState({
    isPristine: true,
    isValid: false,
    validations: [required],
    value: "",
  });
  const [stars, setStars] = useState({
    isPristine: true,
    isValid: false,
    validations: [required, number],
    value: "",
  });
  const [year, setYear] = useState({
    isPristine: true,
    isValid: false,
    validations: [required],
    value: "",
  });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!checkFieldsValidity(title, format, stars, year)) {
      return;
    }
    handleSubmit(title.value, year.value, format.value, stars.value);
  };

  useClickOutside(formRef, handleClose);

  const checkFieldsValidity = (...fields) => {
    for (const field of fields) {
      if (!field.isValid) return false;
    }
    return true;
  };
  const checkValueValidity = (value, validations) => {
    for (const validation of validations) {
      if (validation) {
        return false;
      }
    }
    return true;
  };
  return (
    <div className={cn(className, "film-modal")}>
      <form
        ref={formRef}
        onSubmit={handleFormSubmit}
        className="film-modal__form"
      >
        <span
          className="film-modal__close"
          onClick={() => handleClose()}
        ></span>
        <p className="film-modal__heading">
          Заполните форму,
          <br />
          что бы добавить фильм
        </p>
        <input
          type="text"
          placeholder="Название"
          className={cn("film-modal__input", {
            invalid: !title.pristine && !title.isValid,
          })}
          onChange={(e) => {
            title.value = e.target.value;
          }}
          onBlur={() => {
            title.isPristine = false;
            title.isValid = checkValueValidity(title.value, title.validations);
          }}
        />
        <input
          type="number"
          placeholder="Год выпуска"
          className={cn("film-modal__input", {
            invalid: !year.pristine && !year.isValid,
          })}
          onChange={(e) => {
            year.value = e.target.value;
          }}
          onBlur={() => {
            year.isPristine = false;
            year.isValid = checkValueValidity(year.value, year.validations);
          }}
        />
        <input
          type="text"
          placeholder="Формат"
          className={cn("film-modal__input", {
            invalid: !format.pristine && !format.isValid,
          })}
          onChange={(e) => {
            format.value = e.target.value;
          }}
          onBlur={() => {
            format.isPristine = false;
            format.isValid = checkValueValidity(
              format.value,
              format.validations
            );
          }}
        />
        <input
          type="text"
          placeholder="Актёры"
          className={cn("film-modal__input", {
            invalid: !stars.pristine && !stars.isValid,
          })}
          onChange={(e) => {
            stars.value = e.target.value;
          }}
          onBlur={() => {
            stars.isPristine = false;
            stars.isValid = checkValueValidity(stars.value, stars.validations);
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
