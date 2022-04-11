-- Drops database if existing, otherwise creates database
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- Using the employee_db database
USE employee_db;

-- Creating department table with id and dept_name
CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30)
);

-- Creating role table with id, title, salary, and dept_id. Also created a foreign key constraint for dept_id that references id in the department table
CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(8, 2),
    dept_id INTEGER,
    CONSTRAINT fk_dept_id FOREIGN KEY (dept_id) REFERENCES department(id) ON DELETE SET NULL
);

-- Creating employee table with id, first_name, last_name, role_id, and manager_id. Created two foreign key constraints, the first is role_id, which references the id in the role table. The second is manager_id which references id in the employee table.
CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    CONSTRAINT fk_role_id FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
    manager_id INTEGER,
    CONSTRAINT fk_manager_id FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);