import express from "express";
import { fetchEpisodes } from "../controllers/episodes.js";
const router = express.Router();

router.post("/episodes", fetchEpisodes);

export { router as Router };
