export const createBunch = (db, movies) => {
  let sqlString = "";
  movies.forEach(({ movie, actor }) => {
    sqlString += `SELECT createMovie('${movie.title}','${movie.format}','${
      movie.releaseyear
    }','{${actor.toString()}}');`;
  });
  return db.query(sqlString).then((data) => data.rows);
};
