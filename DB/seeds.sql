INSERT INTO department (name, id)
VALUES ("Sales", 1), ("Develop", 2), ("Accounting", 3), ("Marketing", 4), ("Manager", 5);

INSERT INTO role (title, salary, department_id)
VALUES ("Salesman", 65000, 1), ("Developer", 90000, 2), ("Accountant", 70000, 3), ("Analyst", 80000, 4), ("Manager", 60000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Robert", "Downey Jr", 5, 1), ("Gwyneth", "Paltrow", 5, 2), ("Jon", "Favreau", 4, NULL), ("Don", "Cheadle", 3, NULL), ("Stan", "Lee", 2, NULL);