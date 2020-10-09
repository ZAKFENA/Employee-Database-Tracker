CREATE DATABASE employees_trackerDB;

USE employees_trackerDB;

CREATE TABLE department
(
    id INT NOT NULL
    AUTO_INCREMENT,
  Dep_name VARCHAR
    (30) NOT NULL,
  PRIMARY KEY
    (id)
);

    CREATE TABLE roles
    (
        id INT NOT NULL
        AUTO_INCREMENT,
  title VARCHAR
        (30) NOT NULL,
  salary DECIMAL
        (10,2) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY
        (id),
  FOREIGN KEY
        (department_id) REFERENCES department
        (id)
);

        CREATE TABLE employee
        (
            id INT NOT NULL
            AUTO_INCREMENT,
  first_name VARCHAR
            (30) NOT NULL,
  last_name VARCHAR
            (30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY
            (id),
  FOREIGN KEY
            (role_id) REFERENCES roles
            (id)
);