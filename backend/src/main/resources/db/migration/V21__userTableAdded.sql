create table users (
        id UUID,
        name varchar(65535),
        visited_places UUID[],
        favourite_category varchar(65535),
        live_location text[],
        primary key (id)
);