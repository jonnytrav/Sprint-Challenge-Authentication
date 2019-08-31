const router = require("express").Router();
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const secret = require("../secret.js");
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
  let user = req.body;

  DB.findUser(user.username)
    .then(response => {
      if (response && bcrypt.compareSync(user.password, response.password)) {
        const token = generateJWT(user);
        console.log(token);
        res
          .status(200)
          .json({ message: `Welcome, ${response.username}!`, token });
      }
    })
    .catch(err => {
      res.status(400).json({ success: false, error: err.message });
    });
});

function generateJWT(user) {
  const payload = {
    sub: user.id,
    name: user.username
  };
  const options = {
    expiresIn: "1hr"
  };
  return JWT.sign(payload, secret.JWTsecret, options);
}

// router.get("/", async (req, res) => {
//   try {
//     const users = await DB.getUsers();
//     res.json(users);
//   } catch (err) {
//     res.status(400).json(err.message);
//   }
// });

module.exports = router;
