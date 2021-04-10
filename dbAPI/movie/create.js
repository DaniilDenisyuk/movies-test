export function create(db, film) {
  const {
    movie: { title, format, releaseyear },
    actor,
  } = film;
  return db
    .query(
      `SELECT createMovie('${title}','${releaseyear}','${format}','{${actor.toString()}}')`
    )
    .then((data) => data.rows[0].id);
}
