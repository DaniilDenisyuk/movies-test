import cn from "classnames";
import { connect } from "react-redux";
import { deleteFilm } from "../redux/actionCreators/films";

const FilmLI = ({ className, id, title, year, deleteFilm }) => (
  <li className={cn(className, "film-li")}>
    <h2 className="film-li__title">{title}</h2>
    <h3 className="film-li__year">{year}</h3>
    <button className="film-li__delete" onClick={() => deleteFilm(id)}>
      Удалить фильм
    </button>
  </li>
);

const mapDispatch = { deleteFilm };

export default connect(null, mapDispatch)(FilmLI);
