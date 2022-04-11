// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql2");

// dotenv require for password encryption
require("dotenv").config();

// Database connection
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: process.env.SECRET_KEY,
    database: "employee_db",
  },
  console.log("Connected to the employee_db database.")
);

db.connect((err) => {
  if (err) throw err;
});
