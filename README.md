# SQL Employee Tracker

## Description

My motivation for this project was to familiarize myself with using raw **MySQL** statements, as well as working with setting up a database, creating tables for the database, and seeding the database.

I learned a lot about using raw **MySQL** statements. I also learned how to set up a project's directory, and I dabbled a little with using **dotenv** to hide my password from the public. I struggled when working with arrays and properly mapping over them, but with some Googling and scouring stackoverflow, I eventually came around to using it.

## Installation

To install simply type the following commands in the integrated terminal:

```
npm init -y
npm i
```

## Usage

Video demonstration: https://drive.google.com/file/d/1lRBYzx4ITXjdRjAy78P6yB31JC6Giegw/view

To use this application simply type the following command and follow the prompt:

```
npm start
```

To load database and load seeds from **MySQL** the following commands:
```
mysql -u root -p
source db/schema.sql
source db/seed.sql
```

## Credits

**MySQL documentation** - https://dev.mysql.com/doc/

**Inquirer** - https://www.npmjs.com/package/inquirer

**mysql2** - https://www.npmjs.com/package/mysql2

**console.table** - https://www.npmjs.com/package/console.table

**dotenv** - https://www.npmjs.com/package/dotenv

**.map() MDN** - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

**.find() MDN** - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find