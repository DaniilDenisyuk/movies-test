CREATE TABLE Movie (
  Id   serial,
  Title varchar(127) NOT NULL,
  ReleaseYear SMALLINT NOT NULL,
  Format varchar(31) NOT NULL
);
ALTER TABLE Movie ADD CONSTRAINT pkMovie PRIMARY KEY (Id);
CREATE UNIQUE INDEX akMovie ON Movie (Title, ReleaseYear);

CREATE TABLE Actor (
  Id   serial,
  FirstName varchar(127) NOT NULL,
  LastName varchar(127) NOT NULL
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

CREATE OR REPLACE FUNCTION insertIntoMovie(title VARCHAR, year SMALLINT, format VARCHAR) RETURNS INTEGER AS $$
  INSERT INTO Movie (Title,ReleaseYear,Format) VALUES ($1, $2, $3) RETURNING Id;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION insertIntoActor(firstName VARCHAR, lastName VARCHAR) RETURNS INTEGER AS $$
  INSERT INTO Actor (FirstName, LastName) VALUES ($1, $2) RETURNING Id;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION insertIntoActorMovie(actorId INTEGER, movieId INTEGER) RETURNS void AS $$
  INSERT INTO ActorMovie (ActorId, MovieId) VALUES ($1, $2);
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION insertIfActorIsNotExists(firstName VARCHAR, lastName VARCHAR) RETURNS INTEGER AS $$
DECLARE 
  actorId INT;
BEGIN
  SELECT Id INTO STRICT actorId FROM Actor WHERE Actor.FirstName = $1 AND Actor.LastName = $2 ;
  IF NOT FOUND THEN
    INSERT INTO Actor (FirstName, LastName) VALUES ($1, $2) RETURNING Id INTO STRICT actorId;
  ELSE RETURN Id;
  END IF;
  RETURN actorId;
END;
$$ LANGUAGE plpgsql;
