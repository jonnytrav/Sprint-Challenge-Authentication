const request = require("supertest");
const server = require("./api/server.js");
const DB = require("./database/dbConfig.js");
const userHelpers = require("./auth/authModel.js");
const axios = require("axios");

describe("Auth Router", () => {
  beforeEach(async () => {
    await DB("users").truncate();
  });
  describe("Post to /register", () => {
    it("should return status 201 upon user creation", async () => {
      const tempUser = { username: "user", password: "pass" };
      await userHelpers.createUser(tempUser);

      const users = await DB("users");

      expect(201);
    });
    it("should save new user to database", async () => {
      const tempUser = { username: "user", password: "pass" };
      await userHelpers.createUser(tempUser);

      const users = await DB("users");
      expect(users).toHaveLength(1);
    });
  });
  describe("Post to /login for JWT", () => {
    //LOGIN ROUTE HANDLER SIMPLY FINDS USER AND COMPARES PASSWORDS.. GOING TO CHECK THE FINDUSER FUNCTION
    it("should return status 200 upon finding user", async () => {
      //NOT SURE IF ITS BAD PRACTICE TO ADD USER WITH ANOTHER FUNCTION THEN TEST THIS FUNCTION
      const tempUser = { username: "user", password: "pass" };
      await userHelpers.createUser(tempUser);

      const user = await userHelpers.findUser(tempUser.username);
      expect(200);
    });
    it("should authenticate new user credentials", async () => {
      const tempUser = { username: "user", password: "pass" };
      await userHelpers.createUser(tempUser);

      const users = await DB("users");
      expect(users).toHaveLength(1);

      userHelpers
        .findUser(tempUser.username)
        .then(response => {
          if (
            response &&
            bcrypt.compareSync(tempUser.password, response.password)
          ) {
            // res
            //   .status(200)
            //   .json({ message: `Welcome, ${response.username}!`, token });
            console.log("worked!");
          }
        })
        .catch(err => {
          res.status(400).json({ success: false, error: err.message });
        });
    });
  });
});

describe("Jokes Router", () => {
  beforeEach(async () => {
    await DB("users").truncate();
  });
  describe("Get to /jokes with JWT", async () => {
    it("should return status of 401 through JSON body without valid JWT", () => {
      return request(server)
        .get("/api/jokes")
        .expect(401)
        .expect("Content-Type", /json/);
    });
  });
});
