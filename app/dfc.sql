--drop table if exists news;

create table news (
  id integer primary key autoincrement,
  createdDate text not null default (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  title text not null,
  body text not null
);

--drop table if exists offers;

create table offers (
  id integer primary key autoincrement,
  name text not null,
  amount integer not null,
  weightMin integer not null,
  weightMax integer not null,
  price real not null
);

--drop table if exists offersInfo;

create table offersInfo (
  id integer primary key autoincrement,
  title text not null
);

begin transaction;
alter table news add language text not null default('pl');
commit;

begin transaction;
alter table offers rename to offers_tmp;
create table offers (
  id integer primary key autoincrement,
  namePl text not null,
  nameEn text not null,
  amount integer not null,
  weightMin integer not null,
  weightMax integer not null,
  price real not null
);

insert into offers(id, namePl, nameEn, amount, weightMin, weightMax, price)
select id, name, 'XXX', amount, weightMin, weightMax, price
from offers_tmp;
drop table offers_tmp;
commit;

begin transaction;
alter table offersInfos rename to offersInfos_tmp;
create table offersInfos (
  id integer primary key autoincrement,
  titlePl text not null,
  titleEn text not null
);
insert into offersInfos(id, titlePl, titleEn)
  select id, title, 'XXX'
  from offersInfos_tmp;
drop table offersInfos_tmp;
commit;