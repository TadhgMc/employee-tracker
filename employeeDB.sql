DROP DATABASE IF exists EmployeeDB;
CREATE DATABASE EmployeeDB;
USE EmployeeDB;

CREATE TABLE employee (
employee_id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
PRIMARY KEY(employee_id)
);

CREATE TABLE roles (
role_id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
PRIMARY KEY(role_id)
);

CREATE TABLE department (
department_id INT NOT NULL AUTO_INCREMENT,
department VARCHAR(30),
PRIMARY KEY(department_id)
);

-- add employee
INSERT INTO employee(first_name, last_name, role_id)
VALUES ("Bob","Roberts", 1),
("Tommy", "Shelby", 4),
("Homer", "Simpson", 3),
("Theodore","Willington", 2);

-- add department
INSERT INTO department(department)
VALUES("ENGINEERING"),("SALES"),("FINANCE"),("LEGAL");

-- add role
INSERT INTO roles(title, salary, department_id)
VALUES ("Full-Stack Dev", 75000, 1),
("Sales Advisor", 75000, 2),
("Accountant", 75000, 3),
("Lawyer", 75000, 4);
