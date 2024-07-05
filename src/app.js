import "dotenv/config.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import gameRouter from "./routes/game.js";
import matchmakingRouter from "./routes/matchmaking.js";

const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "1000mb" }));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello Server Viewer!");
});

app.use("/api/game", gameRouter);
app.use("/api/matchmaking", matchmakingRouter);

export default app;
