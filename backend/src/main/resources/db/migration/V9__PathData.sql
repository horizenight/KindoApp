create table path (
                       id UUID not null,
                       name varchar(65535),
                       description varchar(65535),
                       places text[],
                       primary key (id)
);
