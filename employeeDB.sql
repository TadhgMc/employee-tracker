DROP DATABASE IF exists EmployeeDB;
CREATE DATABASE EmployeeDB;
USE EmployeeDB;

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT,
PRIMARY KEY(id)
);

CREATE TABLE role (
role_id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
PRIMARY KEY(role_id)
);

CREATE TABLE department (
manager_id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30),
PRIMARY KEY(manager_id)
)