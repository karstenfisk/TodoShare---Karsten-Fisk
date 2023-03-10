const express = require("express");
const router = express.Router();
const { User, Note } = require("../db/index");

const ms = 43200000;

// Get signed in user.
// I read this is restful for getting signed in user. It may not be though...
router.get("/me", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.cookies.token);
    res.json(user);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//Sign in
router.post("/login", async (req, res, next) => {
  try {
    const token = await User.authenticate(req.body);
    const user = await User.findByToken(token);
    res.cookie("token", token, {
      expires: new Date(Date.now() + ms),
      httpOnly: true,
    });
    res.json(user);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//Create an account
router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = await user.generateToken();
    res.cookie("token", token, {
      expires: new Date(Date.now() + ms),
      httpOnly: true,
    });
    res.send(user);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      console.log(err);
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

//Log out of account
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.cookie("token", "", { expires: new Date(Date.now()), httpOnly: true });
  res.send("Logged out");
});

module.exports = router;
