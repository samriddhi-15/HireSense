import express from "express";
import { getDashboard } from "../controller/dashboardController.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/:userId", getDashboard);

export default dashboardRouter;