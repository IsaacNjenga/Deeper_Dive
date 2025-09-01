import express from "express";
import { fetchEpisodes } from "../controllers/episodes.js";
import { artistData } from "../controllers/artist.js";
import generateToken from "../middleware/accessToken.js";
const router = express.Router();

router.post("/episodes", fetchEpisodes);

router.post("/artist", generateToken, artistData);

export { router as Router };
