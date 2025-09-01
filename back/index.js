import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Router } from "./routes/routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", Router);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${process.env.PORT || 3001}`);
});
