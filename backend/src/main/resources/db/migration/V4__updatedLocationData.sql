drop table place;

create table place (
                       id UUID not null,
                       name varchar(255),
                       description varchar(255),
                       imageUrl varchar(255),
                       lat varchar(255),
                       lng varchar(255),
                       primary key (id)
);

insert into place (id, name, description, imageUrl, lat, lng)
values (
        'abbd65f8-d3dc-4e55-b5e7-c429da2a15a3',
        'BMW Museum',
        'Lorem Ipsum BLALALALALALALLA',
        'https://th.bing.com/th/id/OIP.hlxAZoz8hP8Ki_nCc40ANgHaEG?pid=ImgDet&rs=1',
        '48.17694578859957',
        '11.559091970348822'
       );
