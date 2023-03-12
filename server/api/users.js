const express = require("express");
const router = express.Router();
const { User, Friend } = require("../db/index");

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
      httpOnly: true,
    });
    req.io.emit("connected", { userId: user.id });
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

router.post("/friends/add", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.cookies.token);
    if (user) {
      const friend = await User.findOne({
        where: { username: req.body.username },
      });
      if (!friend) {
        res.status(404).send("User not found");
      } else {
        const check1 = await Friend.findOne({
          where: {
            userId: user.id,
            friendId: friend.id,
          },
        });
        const check2 = await Friend.findOne({
          where: {
            userId: friend.id,
            friendId: user.id,
          },
        });
        if (!check1 && !check2 && friend.id !== user.id) {
          await Friend.create({
            userId: user.id,
            friendId: friend.id,
            type: "outgoing",
          });
          await Friend.create({
            userId: friend.id,
            friendId: user.id,
            type: "incoming",
          });
        } else {
          res.send("Friend already added or request is pending");
        }
      }
    }
    const newUser = await User.findByToken(req.cookies.token);
    res.send(newUser);
  } catch (e) {
    next(e);
  }
});
router.put("/friends/accept", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.cookies.token);
    const { id } = req.body;
    const friend1 = await Friend.findOne({
      where: { userId: user.id, friendId: id },
    });
    if (friend1.type === "incoming") {
      const friend2 = await Friend.findOne({
        where: { userId: id, friendId: user.id },
      });
      if (friend1 && friend2) {
        await friend1.update({ status: "accepted" });
        await friend2.update({ status: "accepted" });
        res.json(await User.findByToken(req.cookies.token));
      }
    } else {
      res.send("cannot accept request you sent");
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});
router.delete("/friends/rejected/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.cookies.token);
    const id = req.params.id;
    const friend1 = await Friend.findOne({
      where: { userId: user.id, friendId: id },
    });
    const friend2 = await Friend.findOne({
      where: { userId: id, friendId: user.id },
    });
    if (friend1 && friend2) {
      await friend1.destroy();
      await friend2.destroy();
    }
    res.json(await User.findByToken(req.cookies.token));
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//Log out of account
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.cookie("token", "", { expires: new Date(Date.now()), httpOnly: true });
  res.send("Logged out");
});

module.exports = router;
