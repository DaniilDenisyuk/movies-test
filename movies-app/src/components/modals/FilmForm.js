import { useState } from "react";
import cn from "classnames";
import {
  required,
  number,
  minMaxValue,
  limitSpecialChars,
  limitNumbers,
  uniqueNames,
} from "../../shared/validations";
import "./FilmForm.scss";
// I can extract it to some generic element later
const FilmForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState({
    isPristine: true,
    isValid: false,
    validations: [required],
    value: "",
  });
  const [year, setYear] = useState({
    isPristine: true,
    isValid: false,
    validations: [
      required,
      number,
      minMaxValue(1850, new Date().getFullYear()),
    ],
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
    validations: [required, limitSpecialChars, limitNumbers, uniqueNames(",")],
    value: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!checkFieldsValidity(title, format, stars, year)) {
      return;
    }
    handleSubmit(title.value, year.value, format.value, stars.value);
  };

  const checkFieldsValidity = (...fields) => {
    for (const field of fields) {
      if (!field.isValid) return false;
    }
    return true;
  };
  const checkValueValidity = (value, validations) => {
    for (const validation of validations) {
      if (!validation(value)) {
        return false;
      }
    }
    return true;
  };

  return (
    <form onSubmit={handleFormSubmit} className="film-form">
      <h2 className="film-form__heading">
        Заполните форму,
        <br />
        что бы добавить фильм:
      </h2>
      <input
        type="text"
        placeholder="Название"
        className={cn("film-form__input", {
          invalid: !title.isPristine && !title.isValid,
        })}
        onChange={(e) => {
          title.value = e.target.value.trim();
        }}
        onBlur={() => {
          title.isPristine = false;
          setTitle({
            ...title,
            isValid: checkValueValidity(title.value, title.validations),
          });
        }}
      />
      <input
        type="text"
        placeholder="Год выпуска (1850-сейчас)"
        className={cn("film-form__input", {
          invalid: !year.isPristine && !year.isValid,
        })}
        onChange={(e) => {
          year.value = e.target.value.trim();
        }}
        onBlur={() => {
          year.isPristine = false;
          setYear({
            ...year,
            isValid: checkValueValidity(year.value, year.validations),
          });
        }}
      />
      <select
        required
        className={cn("film-form__select", {
          invalid: !format.isPristine && !format.isValid,
        })}
        onChange={(e) => {
          format.value = e.target.value;
        }}
        onBlur={() => {
          format.isPristine = false;
          setFormat({
            ...format,
            isValid: checkValueValidity(format.value, format.validations),
          });
        }}
      >
        <option value="" disabled selected hidden>
          Выберите формат
        </option>
        <option value="VHC">VHC</option>
        <option value="DVD">DVD</option>
        <option value="Blu-Ray">Blu-Ray</option>
      </select>
      <input
        type="text"
        placeholder="Актёры (допустимы только единичные комы и тире)"
        className={cn("film-form__input", {
          invalid: !stars.isPristine && !stars.isValid,
        })}
        onChange={(e) => {
          stars.value = e.target.value.trim();
        }}
        onBlur={() => {
          stars.isPristine = false;
          setStars({
            ...stars,
            isValid: checkValueValidity(stars.value, stars.validations),
          });
        }}
      />
      <button type="submit" className="film-form__submit">
        Подтвердить
      </button>
    </form>
  );
};

export default FilmForm;
