const Note = require("./models/Note");
const User = require("./models/User");
const db = require("./db");
const UserNote = require("./models/UserNote");
const Friend = require("./models/Friends");

User.belongsToMany(Note, { through: UserNote });
Note.belongsToMany(User, { through: UserNote });
User.belongsToMany(User, {
  through: Friend,
  as: "friends",
  foreignKey: "userId",
  otherKey: "friendId",
});

module.exports = { db, Note, User, UserNote, Friend };
