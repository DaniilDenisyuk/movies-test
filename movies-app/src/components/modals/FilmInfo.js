import "./FilmInfo.scss";

const FilmInfo = ({ film }) => (
  <div className="film-info">
    <h2 className="film-info__heading">Информация о фильме</h2>
    <div className="film-info__wrapper">
      <h3 className="film-info__row">
        <span className="film-info__row-name">Название:</span>
        <span>{film.title}</span>
      </h3>
      <h3 className="film-info__row">
        <span className="film-info__row-name">Год выпуска:</span>
        <span>{film.releaseyear}</span>
      </h3>
      <h3 className="film-info__row">
        <span className="film-info__row-name">Формат:</span>
        <span>{film.format}</span>
      </h3>
      <h3 className="film-info__row">
        <span className="film-info__row-name">Актеры:</span>
        <span>{film.stars}</span>
      </h3>
    </div>
  </div>
);

export default FilmInfo;
