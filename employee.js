const mysql = require("mysql");
const inquirer = require("inquirer");
const { join } = require("path");
const cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "userz",

  // Your password
  password: "zuser12",
  database: "employees_trackerDB",
});

connection.connect(function (err) {
  if (err) throw err;
  firstPrompt();
});

function firstPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "firstchoices",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Employees By Department",
          "View All Employees By Manager",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Update Employee Manager",
        ],
      },
    ])
    .then((answers) => {
      if (answers.firstchoices === "View All Employees") {
        viewAllEmployee();
      }
      if (answers.firstchoices === "View All Employees By Department") {
        viewAllEmployeeByDept();
      }
      if (answers.firstchoices === "View All Employees By Manager") {
        viewAllEmployeeByMngr();
      }
      if (answers.firstchoices === "Add Employee") {
        addEmployee();
      }
      if (answers.firstchoices === "Remove Employe") {
        removeEmployee();
      }
      if (answers.firstchoices === "Update Employee Role") {
        updateEmployeeRole();
      }
      if (answers.firstchoices === "Update Employee Manager") {
        updateEmployeeManager();
      }
    });
}

function viewAllEmployee() {
  connection.query(
    `SELECT 
    employee.first_name, 
    employee.last_name, 
    roles.title, 
    department.Dep_name, 
    roles.salary
  FROM employee
  LEFT JOIN roles ON employee.role_id = roles.id
  LEFT JOIN department ON department.id = roles.department_id
    `,
    function (err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      firstPrompt();
    }
  );
}

function viewAllEmployeeByDept() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "depchoice",
        message: "Please select department",
        choices: [
          { name: "Sales", value: 1 },
          { name: "Engineering", value: 2 },
          { name: "Finance", value: 3 },
          { name: "Legal", value: 4 },
        ],
      },
    ])
    .then(function (answers) {
      connection.query(
        `SELECT employee.first_name, employee.last_name, roles.title, department.Dep_name, roles.salary 
  FROM employee 
  LEFT JOIN roles ON employee.role_id = roles.id
  JOIN department ON department.id = roles.department_id
  WHERE department.id = ${answers.depchoice}
   `,
        function (err, res) {
          if (err) throw err;
          console.table(res);
          firstPrompt();
        }
      );
    });
}

function viewAllEmployeeByMngr() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "managerchoice",
        message: "Please select department",
        choices: [
          { name: "Ashley Rodriguez", value: 3 },
          { name: "Malia Brown", value: 5 },
          { name: "Sarah Lourd", value: 6 },
        ],
      },
    ])
    .then(function (answers) {
      connection.query(
        `SELECT employee.first_name, employee.last_name, roles.title, department.Dep_name, employee.manager_id AS manager, roles.salary 
  FROM employee 
  LEFT JOIN roles ON employee.role_id = roles.id
  LEFT JOIN department ON department.id = roles.department_id
  WHERE employee.manager_id = ${answers.managerchoice}
   `,
        function (err, res) {
          if (err) throw err;
          console.table(res);
          firstPrompt();
        }
      );
    });
}

function addEmployee() {
  console.log("Inserting a new product...\n");
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstname",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastname",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "employeerole",
        message: "What is the employee's role?",
        choices: [
          "Sales Lead",
          "Salesperson",
          "Lead Engineer",
          "Software Engineer",
          "Acountant",
          "Legal Team Lead",
          "Lawyer",
        ],
      },
      {
        type: "list",
        name: "employeemanager",
        message: "who is the employee's manager?",
        choices: [
          "John Doe",
          "Mike Chan",
          "Kevin Tupik",
          "Tom Allen",
          "Tammer Galal",
        ],
      },
    ])
    .then((answers) => {
      connection.query(
        `SELECT employee.first_name, employee.last_name, roles.title, department.Dep_name, roles.salary 
  FROM employee 
  LEFT JOIN roles ON employee.role_id = roles.id
  LEFT JOIN department ON department.id = roles.department_id INSERT INTO employee SET ?`,
        {
          first_name: answers.firstname,
          last_name: answers.lastname,
          roles: answers.employeerole,
          manager: answers.employeemanager,
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " employee added \n");
        }
      );
      // logs the actual query being run
      console.table(res);
    });
}

// removeEmployee();
// {
//   inquirer
//     .prompt([
//       {
//         type: "list",
//         name: "removeemployee",
//         message: "Select the employee being removed from the database",
//         choices: [
//           "John Doe",
//           "Mike Chan",
//           "Ashley Rodriguez",
//           "Kevin Tupik",
//           "Malia Brown",
//           "Sarah Lourd",
//           "Tom Allen",
//           "Tammer Galal",
//         ],
//       },
//     ])
//     .then((answers) => {
//       console.log("Removing employee from the DataBase...\n");
//       connection.query(
//         "DELETE FROM employee WHERE ?",
//         {
//           id:
//         },
//         function (err, res) {
//           if (err) throw err;
//           console.log(res.affectedRows + " employee removed\n");
//         }
//       );
//     });
// }

// updateEmployeeRole(){

// }

// updateEployeeManager(){

// }
