/* psql -U adamjohnson < server/db/schema.sql  THIS ONE!!!*/
DROP DATABASE IF EXISTS datepicker;
CREATE DATABASE datepicker;
\c datepicker;
DROP TABLE IF EXISTS eventFollows;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS orgFollows;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS orgs;
CREATE TABLE orgs (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(60) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  reported INT NOT NULL DEFAULT 0,
  zip INT NOT NULL,
  password VARCHAR(100) NOT NULL,
  salt VARCHAR(60) NOT NULL DEFAULT ''
);
CREATE TABLE users (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(60) NOT NULL,
  reported INT NOT NULL DEFAULT 0,
  password VARCHAR(100) NOT NULL,
  salt VARCHAR(60) NOT NULL DEFAULT '',
  zip INT NOT NULL
);
CREATE TABLE orgFollows (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  user_id INT NOT NULL,
  org_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (org_id) REFERENCES orgs(id) ON DELETE CASCADE
);
CREATE TABLE events (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name VARCHAR(100),
  date BIGINT,
  description VARCHAR(1000),
  org_id INT NOT NULL,
  zip INT NOT NULL,
  type VARCHAR(20),
  FOREIGN KEY (org_id) REFERENCES orgs(id) ON DELETE CASCADE
);
CREATE TABLE eventFollows (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  user_id INT NOT NULL,
  event_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);
CREATE TABLE sessions (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  hash VARCHAR(100) NOT NULL,
  user_id INT DEFAULT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
INSERT INTO orgs(
    name,
    username,
    email,
    description,
    password,
    zip,
    salt
  )
VALUES (
    'BBQ Party',
    'bbqparty',
    'test@gmial.com',
    'the best bbq party in town. follow us for more information!! thanks everyone!',
    '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    '94606',
    ''
  ),
  (
    'Pizza Party',
    'pizzaparty',
    'test@gmial.com',
    'the best pizza party in town. follow us for more information!! thanks everyone!',
    'pizzaparty',
    '94606',
    ''
  ),
  (
    'Egg Party',
    'eggparty',
    'test@gmial.com',
    'the best egg party in town. follow us for more information!! thanks everyone!',
    'eggparty',
    '94606',
    ''
  ),
  (
    'Pancake Party',
    'pancakeparty',
    'test@gmial.com',
    'the best pancake party in town. follow us for more information!! thanks everyone!',
    'pancakeparty',
    '94606',
    ''
  );
INSERT INTO users(username, email, zip, password, salt)
VALUES ('Doug', 'test@gmial.com', 94606, 'doug', ''),
  ('t', 'test@gmial.com', 94606, 't', ''),
  ('mary', 'test@gmial.com', 94606, 'Mary', ''),
  (
    'adam',
    'test@gmial.com',
    94606,
    '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    ''
  );
INSERT INTO orgFollows(user_id, org_id)
VALUES (3, 3),
  (3, 2),
  (2, 3),
  (2, 2),
  (4, 1),
  (4, 2);
INSERT INTO events(name, date, org_id, zip, type)
VALUES ('Big Test Party', 1605931, 1, 94606, 'food'),
  ('Other Test Party', 1605931, 1, 94606, 'food'),
  ('Other Test Party', 1605931, 1, 94606, 'food'),
  ('Other Test Party', 1605931, 1, 94606, 'food'),
  ('Other Test Party', 1605931, 1, 94606, 'food'),
  ('Other Test Party', 1605931, 1, 94606, 'music'),
  ('Other Test Party', 1605931, 1, 94607, 'music'),
  ('Other Test Party', 1605931, 1, 94607, 'music'),
   ('Other Test Party', 1605931, 1, 94606, 'food'),
  ('Other Test Party', 1605931, 1, 94606, 'food'),
  ('Other Test Party', 1605931, 1, 94606, 'food'),
  ('Other Test Party', 1605931, 1, 94606, 'food'),
  ('Other Test Party', 1605931, 1, 94606, 'music'),
  ('Other Test Party', 1605931, 1, 94607, 'music'),
  ('Other Test Party', 1605931, 1, 94607, 'music'),
   ('Other Test Party', 1605931, 1, 94606, 'food'),
  ('Other Test Party', 1605931, 1, 94606, 'food'),
  ('Other Test Party', 1605931, 1, 94606, 'food'),
  ('Other Test Party', 1605931, 1, 94606, 'food'),
  ('Other Test Party', 1605931, 1, 94606, 'music'),
  ('Other Test Party', 1605931, 1, 94607, 'music'),
  ('Other Test Party', 1605931, 1, 94607, 'music');
INSERT INTO eventFollows(user_id, event_id)
VALUES (1, 1),
  (4, 1),
  (4, 2);
----
-- CREATE INDEX quesiton_reported_index ON questions (reported);
-- \c datepicker;
-- \COPY questions FROM './csv/questionsCSV.csv' WITH DELIMITER ',' CSV HEADER;
-- SELECT setval(pg_get_serial_sequence('questions', 'question_id'), (SELECT MAX(question_id) from "questions"));
-- SELECT setval(pg_get_serial_sequence('answers', 'id'), (SELECT MAX(id) from "answers"));
-- SELECT setval(pg_get_serial_sequence('answer_photos', 'photo_id'), (SELECT MAX(photo_id) from "answer_photos"));