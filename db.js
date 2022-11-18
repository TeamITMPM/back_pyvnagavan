const { Sequelize } = require("sequelize");

module.express = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mariadb",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  }
);
