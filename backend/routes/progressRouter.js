import express from "express";
import { getProgress } from "../controller/progressController.js";

const router = express.Router();

router.get("/:userId", getProgress);

export default router;