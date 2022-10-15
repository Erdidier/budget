import Sequelize from "sequelize";
import db from "../config/db.js";
import { Movement } from "./Movements.js";

export const User = db.define("users", {
  username: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

User.hasMany(Movement);

db.sync({ force: false });
