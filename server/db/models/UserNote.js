const Sequelize = require("sequelize");
const db = require("../db");

const UserNote = db.define("userNote", {
  userType: {
    type: Sequelize.ENUM("owner", "guest"),
    defaultValue: "owner",
  },
});
module.exports = UserNote;
