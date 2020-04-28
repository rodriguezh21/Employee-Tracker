const mysql = require("mysql");
const inquirer = require("inquirer");
const util = require("util");


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "emp_trackerDB"
});
connection.query = util.promisify(connection.query)

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    questions()
});

function questions() {
    inquirer.prompt({
        message: "What would you like to do?",
        type: "list",
        name: "choice",
        choices: [
            "Add Employee",
            "Add Department",
            "Add Role",
            "View Employees",
            "View Departments",
            "View Roles",
            "Update Employee Manager"
        ]
    }).then(answers => {
        switch (answers.choice) {
            case "Add Employee":
                addEmployee()
                break;

            case "View Employees":
                viewEmployees()
                break;
            case "Add Department":
                addDepartment()
                break;
            case "View Departments":
                viewDepartment()
                break;
            case "Add Role":
                addRole()
                break;
            case "View Roles":
                viewRoles()
                break;
            case "Update Employee Manager":
                updateEmployee()
                break;

        }
        function addEmployee() {
            inquirer.prompt([

                {
                    type: "input",
                    name: "firstName",
                    message: "What is the employee's first name?"
                },
                {
                    type: "input",
                    name: "lastName",
                    message: "What is the employee's last name?"
                },
                {
                    type: "list",
                    name: "roleId",
                    message: "What is the employee's role?",
                    choices: [
                        "1 Salesman",
                        "2 Developer",
                        "3 Accountant",
                        "4 Analyst",
                        "5 Manager"
                    ]
                },
                {
                    type: "number",
                    name: "managerId",
                    message: "What is the employees manager's ID?"
                }
            ]).then(function (res) {
                var roleID = res.roleId.split(" ");
                connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [res.firstName, res.lastName, roleID[0], res.managerId], function (err, data) {
                    if (err) throw err;
                    console.table("Success!");
                    questions();
                })
            })
        }
    })
}
function viewDepartment() {
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err;
        console.table(data);
        questions();

    })
}
function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, data) {
        if (err) throw err;
        console.table(data);
        questions();
    })
}
function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "Department name?"
        }
    ]).then(function (res) {
        connection.query("INSERT INTO department (name) VALUES (?)", [res.department], function (err, data) {
            if (err) throw err;
            console.table("Success!");
            questions();
        })
    })
}
function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Enter employee's title"
        },
        {
            type: "number",
            name: "salary",
            message: "Enter employee's salary"

        },
        {
            type: "input",
            name: "departmentId",
            message: "Enter department ID"
        }
    ]).then(function (res) {
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [res.title, res.salary, res.departmentId], function (err, data) {
            if (err) throw err;
            console.table("Success!");
            questions();
        })
    })
}
function viewRoles() {
    connection.query("SELECT * FROM role", function (err, data) {
        if (err) throw err;
        console.table(data);
        questions();
    })
}
// Chris and Nick helped me with this solution




// updating employees

async function updateEmployee() {
    const employees = await connection.query("SELECT id, first_name, last_name FROM employee")
    const employeeChoices = employees.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }))

    const employeeId = await
        inquirer.prompt(
            {
                type: "list",
                name: "eName",
                message: "Select employee you want to update manager for:",
                choices: employeeChoices
            }
        )
        console.log('employeeId', employeeId)
    const managers = await connection.query("SELECT id, first_name, last_name FROM employee WHERE role_id=5")
    const managerChoices = managers.map(manager => ({
        name: `${manager.first_name} ${manager.last_name}`,
        value: manager.id
    }))

    const managerId = await
        inquirer.prompt(
            {
                type: "list",
                name: "eName",
                message: "Select manager:",
                choices: managerChoices
            }
        )
        console.log('managerId', managerId)
    await connection.query("UPDATE employee SET manager_id=? WHERE id=?", [managerId.eName, employeeId.eName])
    questions();

}


