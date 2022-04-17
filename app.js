// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql2");

// Importing view functions from lib/view.js
const {
  viewAllDepartment,
  viewAllRole,
  viewAllEmployee,
  viewEmployeeByManager,
  viewTotalBudgetByDept,
} = require("./lib/view");

// Importing add functions from lib/add.js
const { addDept, addRole, addEmployee } = require("./lib/add");

// Importing update functions from lib/update.js
const { updateEmpRole, updateEmpManager } = require("./lib/update");

// Importing delete functions from lib/delete.js
const { deleteDept, deleteRole, deleteEmployee } = require("./lib/delete");

// dotenv require for password encryption
require("dotenv").config();

// Database connection details
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    // Using hidden .env for the password
    password: process.env.SECRET_KEY,
    database: "employee_db",
  },
  console.log("Connected to the employee_db database.")
);

// Initialize database connection
db.connect((err) => {
  if (err) throw err;
  startPrompt();
});

// startPrompt function to initialize inquirer prompt
function startPrompt() {
  inquirer
    .prompt({
      name: "actions",
      type: "list",
      message: "Please select one of the following actions.",
      choices: [
        "View all employees",
        "View all roles",
        "View all departments",
        "View employees by manager",
        "View total budget by department",
        "Add employee",
        "Add role",
        "Add department",
        "Update employee role",
        "Update employee manager",
        "Delete employee",
        "Delete role",
        "Delete department",
        "Exit",
      ],
    })
    .then((userInput) => {
      // Using a switch statement for the answers
      switch (userInput.actions) {
        // Using cases to call matching functions
        case "View all employees":
          viewAllEmployee(db, startPrompt);
          // Can't forget to break each case!
          break;
        case "View all roles":
          viewAllRole(db, startPrompt);
          break;
        case "View all departments":
          viewAllDepartment(db, startPrompt);
          break;
        case "View employees by manager":
          viewEmployeeByManager(db, startPrompt);
          break;
        case "View total budget by department":
          viewTotalBudgetByDept(db, startPrompt);
          break;
        case "Add employee":
          addEmployee(db, startPrompt);
          break;
        case "Add role":
          addRole(db, startPrompt);
          break;
        case "Add department":
          addDept(db, startPrompt);
          break;
        case "Update employee role":
          updateEmpRole(db, startPrompt);
          break;
        case "Update employee manager":
          updateEmpManager(db, startPrompt);
          break;
        case "Delete employee":
          deleteEmployee(db, startPrompt);
          break;
        case "Delete role":
          deleteRole(db, startPrompt);
          break;
        case "Delete department":
          deleteDept(db, startPrompt);
          break;
        case "Exit":
          db.end();
          break;
      }
    });
}
