import express from "express";
import { fetchEpisodes } from "../controllers/episodes.js";
import { artistData } from "../controllers/artist.js";
import generateToken from "../middleware/accessToken.js";
import { podcastData } from "../controllers/show.js";
import {
  refreshToken,
  spotifyAuth,
  spotifyCallback,
} from "../controllers/auth.js";
import { fetchUser } from "../controllers/fetchUser.js";
const router = express.Router();

//auth and callback token
router.get("/auth", spotifyAuth);
router.post("/callback", spotifyCallback);
router.post("/refresh_token", refreshToken);

router.get('/me', fetchUser)

router.post("/episode", generateToken, fetchEpisodes);
router.post("/artist", generateToken, artistData);
router.post("/podcast", generateToken, podcastData);

export { router as Router };
