import cn from "classnames";
import { connect } from "redux";
import { deleteFilm } from "../redux/actionCreators/films";

const FilmLI = ({ className, id, title, year, deleteFilm }) => (
  <li className={cn(className, "film-li")}>
    <h2 className="film-li__title">{title}</h2>
    <h3 className="film-li__year">{year}</h3>
    <button
      className="film-li__delete"
      value="Удалить фильм"
      onClick={deleteFilm(id)}
    />
  </li>
);

const mapDispatch = { deleteFilm };

export default connect(null, mapDispatch)(FilmLI);
