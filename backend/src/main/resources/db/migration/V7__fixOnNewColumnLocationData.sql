ALTER TABLE place
DROP COLUMN visit_count;

ALTER TABLE place
ADD COLUMN visit_count int NOT NULL DEFAULT(0);