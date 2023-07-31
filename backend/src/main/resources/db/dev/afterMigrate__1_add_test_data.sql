-- This file will add some dummy data into the database when the server starts in the "dev" profile.
--
-- Please note that this ALWAYS runs whenever the server starts in the "dev" profile! This means all statements in here
-- must not fail when they're running repeatedly. Therefore, we end all statements with "ON CONFLICT DO NOTHING".

-- PROGRAMS

-- Digital Product School
INSERT INTO person(id, email, first_name, last_name)
VALUES ('adeade6a-dd0b-4e98-b05e-51b2e3a9e66d', 'john@doe.com', 'John', 'Doe')
ON CONFLICT DO NOTHING;