const Sequelize = require("sequelize");
const db = require("../db");

const Note = db.define("note", {
  title: {
    type: Sequelize.STRING,
  },
  content: {
    type: Sequelize.TEXT,
  },
});
module.exports = Note;
