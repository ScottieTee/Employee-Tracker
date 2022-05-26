INSERT INTO department (name)
VALUES 
('sales'),
('engineering'),
('finance'),
('legal');

INSERT INTO roles (title, salary, department_id)
VALUES
('salesperson','8000', '1'),
('lead engineer','150000', '2'),
('software engineer','120000', '2'),
('account manager','160000', '3'),
('accountant','125000', '3'),
('legal team lead', '250000', '3'),
('lawyer','190000', '3');

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("John", "Doe", '1', NULL),
("Mary", "Tomas", '2', '1'),
("Bob", "Boberson", '3', '1'),
("Leslie", "Paley", '4', '1'),
("Mickey", "Jett", '5', '4'),
("Oliver", "Jett", '5', '4');

