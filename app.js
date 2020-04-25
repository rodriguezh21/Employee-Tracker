const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "emp_trackerDB"
});

connection.connect(function(err) {
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
            "View Roles"
        ]
      }).then(answers => {
          switch (answers.choice){
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
                type: "number",
                name: "roleId",
                message: "What is the employee's role?",
                        // choices: [
                        //     "Salesman",
                        //     "Developer",
                        //     "Accountant",
                        //     "Analyst",
                        //     "Manager"
                        // ]
            },
            {
                type: "number",
                name: "managerId",
                message: "What is the employees manager's ID?"
            }
                ]).then(function(res) {
                    connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [res.firstName, res.lastName, res.roleId, res.managerId], function(err, data) {
                        if (err) throw err;
                        console.table("Success!");
                        questions();
                    })
                })
          }
        })
}
    function viewDepartment(){
        connection.query("SELECT * FROM department", function(err, data){
            if(err) throw err;
            console.table(data);
            questions();
            
        })
    }
    function viewEmployees(){
        connection.query("SELECT * FROM employee", function(err, data){
            if(err) throw err;
            console.table(data);
            questions();
        })
    }
    function addDepartment(){
        inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "Department name?"
        }
    ]).then(function(res){
        connection.query("INSERT INTO department (name) VALUES (?)", [res.department], function(err, data){
            if(err) throw err;
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
        ]).then(function(res){
            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [res.title, res.salary, res. departmentId], function(err, data){
                if(err) throw err;
                console.table("Success!");
                questions();
            })
        })
    }
    function viewRoles() {
        connection.query("SELECT * FROM role", function(err, data){
            if(err) throw err;
            console.table(data);
            questions();
        })
    }

    