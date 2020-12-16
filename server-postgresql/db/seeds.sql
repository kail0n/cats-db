DROP TABLE IF EXISTS cats;

CREATE TABLE cats (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    age int NOT NULL,
    owner_id int
);

INSERT INTO cats (name, age, owner_id)
VALUES
    ('Garfield', 44, 1),
    ('Top Cat', 59, null),
    ('Marie', 3, 2),
    ('Toulouse', 3, 2),
    ('Berlioz', 3, 2),
    ('Zelda', 5, 3);

DROP TABLE IF EXISTS owners;

CREATE TABLE owners (
    id serial PRIMARY KEY,
    name varchar(50) NOT NULL,
    address varchar(255)
);

INSERT INTO owners (name, address)
VALUES
    ('Jon Arbuckle', 'Muncie, Indiana'),
    ('Madame Adelaide Bonfamille', 'Paris'),
    ('Beth Schofield', 'South Pavillion');