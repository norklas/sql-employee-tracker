INSERT INTO department (dept_name)
VALUES 
('IT'),
('Finance & Accounting'),
('Sales & Marketing'),
('Operations');

INSERT INTO role (title, salary, dept_id)
VALUES
('Full Stack Developer', 80000, 1),
('Software Engineer', 120000, 1),
('Accountant', 10000, 2), 
('Finanical Analyst', 150000, 2),
('Marketing Coordindator', 70000, 3), 
('Sales Lead', 90000, 3),
('Project Manager', 100000, 4),
('Operations Manager', 90000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Mark', 'Koppen', 2, null),
('Devin', 'Brooke', 1, 1),
('Alisha', 'Brown', 4, null),
('Ashlynn', 'Murphy', 3, 3),
('Tyler', 'Wasta', 6, null),
('Ana', 'Ortiz', 5, 5),
('Lewis', 'Gray', 7, null),
('Katherine', 'Nolan', 8, 7);