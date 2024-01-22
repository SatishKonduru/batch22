create table user (
    id int primary key AUTO_INCREMENT,
    name varchar(100),
    contactNumber varchar(20),
    email varchar(150),
    password varchar(100),
    status varchar(20),
    role varchar(20),
    UNIQUE(email)
);

insert into user (
    name, contactNumber, email, password, status, role
) values (
    'satish', '9182256249', 'rskhelpline@gmail.com', 'admin','true','admin'
);

create table product(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    categoryId integer NOT NULL,
    description varchar(255),
    price integer,
    status varchar(20),
    primary key(id)
);

create table category(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    primary key(id)
);

insert into category(name) values ('mobiles');
insert into category(name) values ('fashion');