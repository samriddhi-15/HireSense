import express from "express";

import { getGoals, createGoal, updateGoal, deleteGoal } from "../controller/goalController.js";

const goalRouter = express.Router();

goalRouter.get("/:userId", getGoals);
goalRouter.post("/", createGoal);
goalRouter.put("/:id", updateGoal);
goalRouter.delete("/:id", deleteGoal);

export default goalRouter;