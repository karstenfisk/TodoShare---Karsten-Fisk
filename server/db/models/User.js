const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const Note = require("./Note");
dotenv.config();
const SALT = 5;

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
});

//Hash password before a user is created.
User.beforeCreate(async (user) => {
  const hashed = await bcrypt.hash(user.password, SALT);
  user.password = hashed;
});

//Create token for cookie
User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

//Check if password is valid
User.prototype.correctPassword = function (pass) {
  return bcrypt.compare(pass, this.password);
};

//Authenticate user for sign in
User.authenticate = async ({ username, password }) => {
  const user = await User.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const err = Error("Invalid username or password");
    throw err;
  }
  return user.generateToken();
};

//Find user by cookie token.
User.findByToken = async (token) => {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(id, {
      include: [
        {
          model: Note,
        },
      ],
    });
    if (!user) {
      return "Could not find user matching this token";
    }
    return user;
  } catch (e) {
    console.log(e);
    const err = Error("e");
    err.status = 401;
    throw err;
  }
};

module.exports = User;
