const knex = require("knex");

const knexConfig = require("../knexfile.js");

DBenv = process.env.DB_ENV || "development";

module.exports = knex(knexConfig[DBenv]);
