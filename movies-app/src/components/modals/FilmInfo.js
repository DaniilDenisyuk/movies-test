import "./FilmInfo.scss";

const FilmInfo = ({ film }) => (
  <div className="film-info">
    <h2 className="film-info__heading">Информация о фильме</h2>
    <h3 className="film-info__row">
      <span className="film-info__row-name">Название:</span>
      {film.title}
    </h3>
    <h3 className="film-info__row">
      <span className="film-info__heading">Год выпуска:</span>
      {film.releaseYear}
    </h3>
    <h3 className="film-info__row">
      <span className="film-info__row-name">Формат:</span>
      {film.format}
    </h3>
    <h3 className="film-info__row">
      <span className="film-info__row-name">Актеры:</span>
      {film.stars}
    </h3>
  </div>
);

export default FilmInfo;
