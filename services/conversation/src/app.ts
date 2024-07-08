import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

app.get("/api/v1/conversation/ping", (req, res) =>
  res.send("pong from conversation service")
);

export default app;
