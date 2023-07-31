drop table users;

create table users (
        id UUID,
        name varchar(65535),
        visited_places UUID[],
        favourite_category text[],
        live_location text[],
        primary key (id)
);