import express from "express";
const router = express.Router();
import {
  saveMovement,
  getMovements,
  getMovement,
  editMovement,
  deleteMovement,
  getMovementsByCategory,
  getMovementsByUserId,
} from "../controllers/MovementsController.js";
import {
  saveUser,
  getUsers,
  login,
  logout,
  getLoggedUser,
} from "../controllers/UsersController.js";

router.get("/", (req, res) => {
  res.send("Budget");
});

// Add movement on DB
router.post("/movements", saveMovement);

// Get movements from DB
router.get("/movements", getMovements);

// Get movements by concept from DB
router.get("/movements/:concept", getMovementsByCategory);

// Get movement by user id from DB
router.get("/movements/user/:userId", getMovementsByUserId);

// Get a single movement by id
router.get("/movements/:id", getMovement);

// Edit movement on DB
router.put("/movements/:id", editMovement);

// Delete movement on DB
router.delete("/movements/:id", deleteMovement);

// Add user on DB
router.post("/users", saveUser);

// Get users from DB
router.get("/users", getUsers);

// Login user
router.post("/login", login);

// Logout user
router.get("/logout", logout);

// Get logged user
router.get("/logged", getLoggedUser);

export default router;
