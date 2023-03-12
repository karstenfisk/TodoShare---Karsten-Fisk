const Sequelize = require("sequelize");
const db = require("../db");

const Friend = db.define("friend", {
  status: {
    type: Sequelize.ENUM(["pending", "accepted"]),
    defaultValue: "pending",
  },
  type: {
    type: Sequelize.ENUM(["outgoing", "incoming"]),
  },
});
module.exports = Friend;
