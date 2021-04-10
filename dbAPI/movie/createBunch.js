export const createBunch = (db, movies) => {
  let sqlString = "";
  movies.forEach(({ movie, actor }) => {
    sqlString += `SELECT createMovie('${movie.title}','${movie.releaseyear}','${
      movie.format
    }','{${actor.toString()}}');`;
  });
  return db.query(sqlString).then((data) => data.rows);
};
