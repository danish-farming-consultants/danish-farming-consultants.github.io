drop table if exists news;

create table news (
  id integer primary key autoincrement,
  createdDate text not null default (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  title text not null,
  body text not null
);

insert into news (createdDate, title, body) values ('2015-08-05T20:39:24Z', 'title1', 'body1');
insert into news (createdDate, title, body) values ('2015-10-05T20:39:24Z', 'title2', 'body2');
insert into news (createdDate, title, body) values ('2015-12-05', 'title3', 'body3');
insert into news (title, body) values ('title4', 'body3');

alter table news
add language text not null default('pl')

drop table if exists offers;

create table offers (
  id integer primary key autoincrement,
  name text not null,
  amount integer not null,
  weightMin integer not null,
  weightMax integer not null,
  price real not null
);

insert into offers (id, name, amount, weightMin, weightMax, price) values (1, 'Tuczniki', 100, 60, 80, 4.2);
insert into offers (id, name, amount, weightMin, weightMax, price) values (2, 'Lochy', 110, 80, 90, 4.6);
insert into offers (id, name, amount, weightMin, weightMax, price) values (3, 'Loszki', 150, 100, 120, 4.1);
insert into offers (id, name, amount, weightMin, weightMax, price) values (4, 'Warchalki', 150, 100, 120, 4.1);

drop table if exists offersInfo;

create table offersInfo (
  id integer primary key autoincrement,
  title text not null
);