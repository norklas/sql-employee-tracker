// Dependencies
const inquirer = require("inquirer");

module.exports = {
  // Add department function
  addDept: function (db, startPrompt) {
    // Prompt for inquirer for adding a new department
    inquirer
      .prompt([
        {
          name: "dept_name",
          type: "input",
          message: "What is the department name?",
        },
      ])
      .then((response) => {
        db.query("INSERT INTO department SET ?", {
          dept_name: response.dept_name,
        });
      })
      .then(() => console.log("Department added!"))
      .then(() => startPrompt());
  },

  // Add role function
  addRole: function (db, startPrompt) {
    // Prompt for inquirer for adding a new role
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the name of the role?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary for this role?",
        },
      ])
      .then((response) => {
        // Using db query to insert new data into role table
        db.query("INSERT INTO role SET ?", {
          title: response.title,
          salary: response.salary,
          dept_id: response.dept_id,
        });
      })
      .then(() => console.log("Role added!"))
      .then(() => startPrompt());
  },

  // Add employee function
  addEmployee: function (db, startPrompt) {
    // Selecting from role table and employee table then mapping through the data for individual data
    db.query("SELECT * FROM role", function (err, roleData) {
      db.query("SELECT * FROM employee", function (err, employeeData) {
        let allRoles = roleData.map((role) => role.title);
        let allManagers = employeeData.map(
          (manager) => manager.first_name + " " + manager.last_name
        );

        // Prompt for adding a new employee
        inquirer
          .prompt([
            {
              name: "first_name",
              type: "input",
              message: "What is the employee's first name?",
            },
            {
              name: "last_name",
              type: "input",
              message: "What is the employee's last name?",
            },
            {
              name: "title",
              type: "list",
              message: "Choose the employee's title",
              choices: allRoles,
            },
            {
              name: "manager",
              type: "list",
              message: "Choose the employee's manager",
              choices: allManagers,
            },
          ])
          .then((response) => {
            // Using find to set new role.title to response.title
            let roleObj = roleData.find(
              (role) => role.title === response.title
            );
            // Using find to set employee first_name and last_name to response.manager
            let employeeObj = employeeData.find(
              (employee) =>
                employee.first_name + " " + employee.last_name ===
                response.manager
            );

            // Query on database to insert new into employee table
            db.query(
              "INSERT INTO employee SET ?",
              {
                first_name: response.first_name,
                last_name: response.last_name,
                role_id: roleObj.id,
                manager_id: employeeObj.id,
              },
              function (err) {
                if (err) throw err;
                console.log("Employee added!");
                startPrompt();
              }
            );
          });
      });
    });
  },
};
