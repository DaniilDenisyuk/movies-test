CREATE TABLE Movie (
  Id   serial,
  Title varchar(255) NOT NULL,
  Release_year varchar(255) NOT NULL,
  Format varchar(255) NOT NULL,
  Stars varchar(255) NOT NULL
);

ALTER TABLE Movie ADD CONSTRAINT pkRubric PRIMARY KEY (Id);
CREATE UNIQUE INDEX akMovie ON Movie (Title, Release_year);
