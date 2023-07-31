DROP TABLE place;

CREATE TABLE place (
                       id UUID NOT NULL,
                       name VARCHAR(255),
                       description VARCHAR(255),
                       imageUrl VARCHAR(255),
                       lat VARCHAR(255),
                       lng VARCHAR(255),
                       PRIMARY KEY (id)
);

INSERT INTO place (id, name, description, imageUrl, lat, lng)
VALUES (
        'abbd65f8-d3dc-4e55-b5e7-c429da2a15a3',
        'BMW Museum',
        'Lorem Ipsum BLALALALALALALLA',
        'https://th.bing.com/th/id/OIP.hlxAZoz8hP8Ki_nCc40ANgHaEG?pid=ImgDet&rs=1',
        '48.17694578859957',
        '11.559091970348822'
       );
