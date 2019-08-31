const router = require("express").Router();
const bcrypt = require("bcrypt");
const DB = require("./authModel.js");

router.post("/register", async (req, res) => {
  let user = req.body;
  const hashedPass = bcrypt.hashSync(user.password, 10);
  user.password = hashedPass;

  try {
    const newUser = await DB.createUser(user);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.post("/login", (req, res) => {
  // implement login
});

router.get("/", async (req, res) => {
  try {
    const users = await DB.getUsers();
    res.json(users);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
