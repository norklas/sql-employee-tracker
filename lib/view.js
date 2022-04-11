module.exports = {
  // View all departments function with db, and startPrompt as parameters
  viewAllDepartment: function (db, startPrompt) {
    // Defining the sql statement, selecting id, and dept_name as Department from department table
    const sql = `SELECT id, dept_name AS Department FROM department`;
    // Query the database with sql statement and put into rows
    db.query(sql, (err, rows) => {
      // Console.table rows
      console.table(rows);
      // Reinitialize prompt
      startPrompt();
    });
  },

  // View all roles function with db, and startPrompt as parameters
  viewAllRole: function (db, startPrompt) {
    // Defining the sql statement, selecting id, and title as titles, then salary from role table
    const sql = `SELECT id, title AS titles, salary FROM role`;
    // Query the database with sql statement and put into rows
    db.query(sql, (err, rows) => {
      // Console.table rows
      console.table(rows);
      // Reinitialize prompt
      startPrompt();
    });
  },

  // View all employees function with db, and startPrompt as parameters
  viewAllEmployee: function (db, startPrompt) {
    // Defining the sql statement. Selecting employee id, employee first name, employee last name, title (from role table), dept_name (from department table then displaying as department), and salary (from role table)
    // Concatenate the manager first name and last name as manager from employee table
    // Left join employee as m on e.manager_id to equal m.id
    // Left join role as r on e.role_id to equal r.id
    // Left join department as d on department.id to equal dept_id
    const sql = `SELECT e.id, e.first_name, e.last_name, title, dept_name AS department, salary,
      CONCAT (m.first_name, ' ', m.last_name) as manager
      FROM employee e
      LEFT JOIN employee m ON e.manager_id = m.id
      LEFT JOIN role r ON e.role_id = r.id
      LEFT JOIN department d ON d.id = dept_id`;
    // Query the database with sql statement and put into rows
    db.query(sql, (err, rows) => {
      // Console.table rows
      console.table(rows);
      // Reinitialize prompt
      startPrompt();
    });
  },

  // View employee by manager function with db, and startPrompt as parameters
  viewEmployeeByManager: function (db, startPrompt) {
    // Defining the sql statement. Selecting employee id, employee first_name, employee last_name
    // Concatenate manager first name and last name as manager from employee table
    // Left join employee manager on e.manager_id to equal manager.id
    // Order by manager
    const sql = `SELECT e.id, e.first_name, e.last_name, 
      CONCAT (manager.first_name, " ", manager.last_name) AS manager
      FROM employee e
      LEFT JOIN employee manager ON e.manager_id = manager.id 
      ORDER BY manager`;
    // Query the database with sql statement and put into rows
    db.query(sql, (err, rows) => {
      // Console.table rows
      console.table(rows);
      // Reinitialize prompt
      startPrompt();
    });
  },

  // View total budget by department function with db, and startPrompt as parameters
  viewTotalBudgetByDept: function (db, startPrompt) {
    // Defining the sql statement. Selecting department name as department, getting the sum of the salaries in role and setting as totalBudgetByDept from employee db
    // Joining employee_db.role AS r on e.role_id then setting it to r.id
    // Joining employee_db.department AS d on r.dept_id then setting to d.id
    // Grouping by dept_name
    // Using union all to combine the results of both SELECT statmenets
    // Selecting total as department, sum of role salaries as salary from employee_db.employee as e
    // Joining employee_db.role as r on e.role_id to r.id
    // Joining employee_db.department AS d on r.dept_id to d.id
    const sql = `
        SELECT d.dept_name as department, sum(r.salary) AS totalBudgetByDept
        FROM employee_db.employee AS e
        JOIN employee_db.role AS r ON e.role_id=r.id
        JOIN employee_db.department AS d ON r.dept_id=d.id
        GROUP BY d.dept_name
        UNION ALL
        SELECT 'TOTAL' AS department, sum(r.salary) AS salary
        FROM employee_db.employee AS e
        JOIN employee_db.role AS r ON e.role_id = r.id
        JOIN employee_db.department AS d ON r.dept_id = d.id
      `;
    // Query the database with sql statement and put into rows
    db.query(sql, (err, rows) => {
      // Console.table rows
      console.table(rows);
      // Reinitialize prompt
      startPrompt();
    });
  },
};
