create database UserDb;
use UserDb;

create Table Users (
id int primary key identity(1,1),
UserName varchar(200),
UserEmail varchar(200),
UserPassword varchar(200)
)

INSERT INTO Users (UserName, UserEmail, UserPassword)
VALUES 
('Santhosh Krishna K S', 'santhoshkrishna771@gmail.com', 'Santhosh@123'),
('Anitha R', 'anitha.r@example.com', 'Anitha@123'),
('Demo', 'demo@gmail.com', 'Demo@123'),

Select * from Users;