CREATE TABLE Movie (
  Id   serial,
  Title varchar(255) NOT NULL,
  ReleaseYear varchar(255) NOT NULL,
  Format varchar(255) NOT NULL
);
ALTER TABLE Movie ADD CONSTRAINT pkMovie PRIMARY KEY (Id);
CREATE UNIQUE INDEX akMovie ON Movie (Title, ReleaseYear);

CREATE TABLE Actor (
  Id   serial,
  FirstName varchar(255) NOT NULL,
  LastName varchar(255) NOT NULL
);
ALTER TABLE Actor ADD CONSTRAINT pkActor PRIMARY KEY (Id);
CREATE UNIQUE INDEX akActor ON Actor (FirstName, LastName);

CREATE TABLE ActorMovie (
  ActorId INTEGER NOT NULL,
  MovieId INTEGER NULL
);
ALTER TABLE ActorMovie ADD CONSTRAINT pkActorMovie PRIMARY KEY (MovieId, ActorId);
ALTER TABLE ActorMovie ADD CONSTRAINT fkActorMovieMovieId FOREIGN KEY (MovieId) REFERENCES Movie (Id) ON DELETE CASCADE;
ALTER TABLE ActorMovie ADD CONSTRAINT fkActorMovieActorId FOREIGN KEY (ActorId) REFERENCES Actor (Id) ON DELETE CASCADE;

