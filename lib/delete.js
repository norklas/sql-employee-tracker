// Require inquirer
const inquirer = require("inquirer");

module.exports = {
  // Delete employee function with db and startPrompt parameters
  deleteEmployee: function (db, startPrompt) {
    // db query to select all employees
    db.query("SELECT * FROM employee", function (err, employeeData) {
      // Mapping over employee data to concatenate first and last names
      let allEmployees = employeeData.map(
        (employee) => employee.first_name + " " + employee.last_name
      );

      // Inquirer prompt which calls allEmployees as choices
      inquirer
        .prompt([
          {
            name: "employee",
            type: "list",
            message: "Select the employee to delete.",
            choices: allEmployees,
          },
        ])
        .then((response) => {
          // Using find method to set employees to equal the response
          let employeeObj = employeeData.find(
            (employee) =>
              employee.first_name + " " + employee.last_name ===
              response.employee
          );

          // db query to delete employee from table with id, using employeeObj for id
          db.query(
            "DELETE FROM employee WHERE id = ?",
            [employeeObj.id],
            function (err) {
              if (err) throw err;
              console.log("Employee deleted!");
              startPrompt();
            }
          );
        });
    });
  },

  // Delete role function with db, and startPrompt as parameters
  deleteRole: function (db, startPrompt) {
    // db query to select all roles
    db.query("SELECT * FROM role", function (err, roleData) {
      // Mapping over roles to set role.title
      let allRoles = roleData.map((role) => role.title);

      // Inquirer prompt which calls allRoles as choices
      inquirer
        .prompt([
          {
            name: "title",
            type: "list",
            message: "Select the role to be deleted.",
            choices: allRoles,
          },
        ])
        .then((response) => {
          // Using find method to find all roles then setting to response.title
          let roleObj = roleData.find((role) => role.title === response.title);

          // db query to delete role with id
          db.query(
            "DELETE FROM role where id = ?",
            // Using roleObj for id
            [roleObj.id],
            function (err) {
              if (err) throw err;
              console.log("Role deleted!");
              startPrompt();
            }
          );
        });
    });
  },

  // Delete department function with db, and startPrompt as parameters
  deleteDept: function (db, startPrompt) {
    // db query to select all departments
    db.query("SELECT * FROM department", function (err, deptData) {
      // Using map on deptData to set department as department.dept_name
      let allDept = deptData.map((department) => department.dept_name);

      // Inquirer prompt that uses allDept as choices
      inquirer
        .prompt([
          {
            name: "dept",
            type: "list",
            message: "Select the department to delete.",
            choices: allDept,
          },
        ])
        .then((response) => {
          // Using find to set dept.dept_name as response.dept
          let deptObj = deptData.find(
            (dept) => dept.dept_name === response.dept
          );

          // db query to delete department with id
          db.query(
            "DELETE FROM department WHERE id = ?",
            // Using deptObj for id
            [deptObj.id],
            function (err) {
              if (err) throw err;
              console.log("Department deleted!");
              startPrompt();
            }
          );
        });
    });
  },
};
