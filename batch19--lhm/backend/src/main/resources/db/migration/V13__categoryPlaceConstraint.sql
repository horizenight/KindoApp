ALTER TABLE category
ADD UNIQUE (name);

ALTER TABLE place
ADD CONSTRAINT place_category
FOREIGN KEY (category)
REFERENCES category (name);