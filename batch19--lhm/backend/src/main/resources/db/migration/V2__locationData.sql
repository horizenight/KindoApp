create table place (
                            id uuid not null,
                            name varchar(255),
                            url varchar(255),
                            lat varchar(255),
                            lon varchar(255),
                            primary key (id)
);

INSERT INTO place(id, name, url, lat, lon)
VALUES (
           'abbd65f8-d3dc-4e55-b5e7-c429da2a15a3',
           'deneme',
           'https://www.google.com',
           '213.3123213',
           '23.3123123'
       );
