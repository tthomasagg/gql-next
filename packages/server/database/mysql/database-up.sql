CREATE DATABASE IF NOT EXISTS number8;

USE number8;

CREATE TABLE IF NOT EXISTS departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_id INT NOT NULL,
    firstName VARCHAR(250) NOT NULL,
    lastName VARCHAR(250) NOT NULL,
    hireDate DATE NOT NULL,
    phone VARCHAR(30),
    address VARCHAR(250),
    avatarUrl VARCHAR(250),
    active INT,
    deletedAt TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments (id)
);

CREATE TABLE IF NOT EXISTS department_history (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    department_id INT NOT NULL,
    changeDate DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (department_id) REFERENCES departments (id),
    FOREIGN KEY (employee_id) REFERENCES employees (id)
);

INSERT IGNORE INTO departments (id, name) VALUES (2, "Human Resources"), (1, "Information Technology");

INSERT IGNORE INTO employees (id, firstName, lastName, hireDate, department_id, avatarUrl, active) VALUES
       (1, "thomas", "gazaniga", "2023-02-03", 1, "https://picsum.photos/id/101/250/250", 1),
       (2, "John", "Doe", "2023-03-03", 1, "https://picsum.photos/id/102/250/250", 1),
       (3, "Margareth", "Smith", "2023-04-03", 1, "https://picsum.photos/id/103/250/250", 0),
       (4, "Wiliam", "McBride", "2023-05-03", 2, "https://picsum.photos/id/104/250/250", 1),
       (5, "Jennifer", "Jones", "2019-06-03", 2, "https://picsum.photos/id/106/250/250", 1);

INSERT IGNORE INTO department_history (id, employee_id, department_id, changeDate) VALUES
       (1, 1, 2, "2023-02-03"),
       (2, 1, 1, "2023-02-03"),
       (3, 2, 1, "2023-03-03");