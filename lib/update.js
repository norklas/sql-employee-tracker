// Require inquirer
const inquirer = require("inquirer");

module.exports = {
  // Update employee role function with db, and startPrompt as parameters
  updateEmpRole: function (db, startPrompt) {
    // db query to select all employees
    db.query("SELECT * FROM employee", function (err, employeeData) {
      // db query to select all roles
      db.query("SELECT * FROM role", function (err, roleData) {
        // setting allEmployees to an array that is mapped to hold employee by first name and last name concatenated
        let allEmployees = employeeData.map(
          (employee) => employee.first_name + " " + employee.last_name
        );
        // setting allRoles to an array that is mapped to hold role with role.title
        let allRoles = roleData.map((role) => role.title);

        // inquirer prompt
        inquirer
          .prompt([
            {
              name: "employee",
              type: "list",
              message: "Select an employee to update.",
              // choices set to allEmployee array
              choices: allEmployees,
            },
            {
              name: "title",
              type: "list",
              message: "Select the employee's new role.",
              // choices set to allRoles array
              choices: allRoles,
            },
          ])
          .then((response) => {
            // using .find method to set response.employee to employee first_name and employee last_name
            let employeeObj = employeeData.find(
              (employee) =>
                employee.first_name + " " + employee.last_name ===
                response.employee
            );
            // using .find method to set response.title to role.title
            let roleObj = roleData.find(
              (role) => role.title === response.title
            );

            // db query to update employee role_id
            db.query(
              "UPDATE employee SET role_id = ? WHERE id = ?",
              // using roleObj id and employeeObj.id for id's
              [roleObj.id, employeeObj.id],
              function (err) {
                if (err) throw err;
                console.log("Employee role updated!");
                startPrompt();
              }
            );
          });
      });
    });
  },

  // Update employee manager function with db, and startPrompt as parameters
  updateEmpManager: function (db, startPrompt) {
    // db query to select all employees
    db.query("SELECT * FROM employee", function (err, employeeData) {
      // setting allEmployees to an array that is mapped to hold employee with first name and last name concatenated
      let allEmployees = employeeData.map(
        (employee) => employee.first_name + " " + employee.last_name
      );
      // setting allManagers to an array that is mapped to hold manager with first name and last name concatenated
      let allManagers = employeeData.map(
        (manager) => manager.first_name + " " + manager.last_name
      );

      // inquirer prompt
      inquirer
        .prompt([
          {
            name: "employee",
            type: "list",
            message: "Select an employee to update.",
            // allEmployees array for choices
            choices: allEmployees,
          },
          {
            name: "manager",
            type: "list",
            message: "Select the employee's new manager",
            // allManagers array for choices
            choices: allManagers,
          },
        ])
        .then((response) => {
          // using .find method to set response.employee to employee first name and employee last_name
          let employeeObj = employeeData.find(
            (employee) =>
              employee.first_name + " " + employee.last_name ===
              response.employee
          );
          // using .find method to set response.manager to employee first name and employee last name
          let managerObj = employeeData.find(
            (employee) =>
              employee.first_name + " " + employee.last_name ===
              response.manager
          );

          // db query to update employee by manager id with id
          db.query(
            "UPDATE employee SET manager_id = ? WHERE id = ?",
            // Using managerObj.id and employeeObj.id for id's
            [managerObj.id, employeeObj.id],
            function (err) {
              if (err) throw err;
              console.log("Employee's manager updated!");
              startPrompt();
            }
          );
        });
    });
  },
};
