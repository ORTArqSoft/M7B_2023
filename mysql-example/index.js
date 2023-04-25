// Documentation about Sequelize: http://docs.sequelizejs.com/manual/getting-started.html

const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:admin@localhost:3306/userDb");
const mysql = require("mysql2");

class User extends Sequelize.Model {
  static start() {
    let attribues = {
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
      email: Sequelize.STRING,
    };
    let options = {
      sequelize,
      modelName: "user",
    };
    this.init(attribues, options);
  }
}

User.start();

(async () => {
  // Open the connection to MySQL server
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
  });

  // Run create database statement
  connection.query(
    `CREATE DATABASE IF NOT EXISTS userDb`,
    function (err, results) {
      console.log(results);
      console.log(err);
    }
  );

  // Close the connection
  connection.end();

  await sequelize.sync();
  let user = await User.create({
    firstName: "Jhon",
    lastName: "Doe",
    email: "example@example.com",
  });
  console.log(user.toJSON());
})();
