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