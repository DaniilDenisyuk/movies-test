export const parseMovies = (content) => {
  const fields = {
    title: "Title:",
    releaseyear: "Release Year:",
    format: "Format:",
    stars: "Stars:",
  };
  return Promise.all(
    content.split("\n\n").map(async (filmStr) => {
      const film = {};
      const filmFields = filmStr.split("\n");
      for (const [key, str] of Object.entries(fields)) {
        filmFields.forEach((field) => {
          if (field.startsWith(str)) {
            film[key] = field.replace(str, "").trim();
          }
        });
      }
      film.stars = film.stars.split(",").map((actor) => actor.trim());
      return film;
    })
  ).catch((e) => {
    console.log(e);
    throw new Error("A problem with movies parsing");
  });
};
