import express from "express";
import { fetchEpisodes } from "../controllers/episodes.js";
import { artistData } from "../controllers/artist.js";
import generateToken from "../middleware/accessToken.js";
import { podcastData } from "../controllers/show.js";
const router = express.Router();

router.post("/episode", generateToken, fetchEpisodes);
router.post("/artist", generateToken, artistData);
router.post("/podcast", generateToken, podcastData);

export { router as Router };
