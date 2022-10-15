import { User } from "../models/Users.js";
import express from "express";
import session from "express-session";

const app = express();

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

export const saveUser = async (req, res, next) => {
  try {
    await User.create(req.body);
    res.json({ message: "Added successfully" });
  } catch (error) {
    console.log(error);
    next();
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.log(error);
    next();
  }
};

export const login = async (req, res, next) => {
  // try {
  const { email, password } = req.body;
  console.log({ first: email, second: password });
  const u = await User.findOne({ where: { email, password } });
  if (u === null) {
    res.json({ message: "Incorrect email or password", loggedin: false });
  } else {
    req.session.loggedin = true;
    req.session.userId = u.id;
    req.session.email = email;
    req.session.username = u.username;
    res.json({ message: "Logged in successfully", loggedin: true });
  }
  // } catch (error) {
  //   console.log(error);
  //   next();
  // }
};

export const logout = async (req, res, next) => {
  try {
    req.session.destroy();
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    next();
  }
};

export const getLoggedUser = async (req, res, next) => {
  try {
    if (req.session.loggedin) {
      res.json({ userId: req.session.userId, user: req.session.username });
    } else {
      res.json({ message: "No user logged in" });
    }
  } catch (error) {
    console.log(error);
    next();
  }
};
