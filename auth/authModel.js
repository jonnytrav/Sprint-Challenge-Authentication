const DB = require("../database/dbConfig.js");

module.exports = {
  createUser,
  getUsers
};

function createUser(user) {
  return DB("users")
    .insert(user)
    .then(res => {
      return res;
    });
}

function getUsers() {
  return DB("users");
}
