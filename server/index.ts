import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import morgan from "morgan";

import authRoutes from "./api/routes/auth.routes";

const app = express();
const PORT = process.env.PORT || 4000;
const { connect, connection } = mongoose;


app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
)

app.get("/", (_: Request, res: Response) => {
  return res.send(`Server is running`);
});

app.use("/api/auth", authRoutes);

connection.on("disconnected", () => {
  console.log("Mongo Atlas has been disconnected!");
});

connection.on("connected", () => {
  console.log("Connecting to Mongo Atlas");
});

app.listen(PORT, async () => {
  try {
    await connect(process.env.MONGO_URL!);
    console.log(
      `Database has connected, server is running on localhost:${PORT}`
    );
  } catch (err) {
    console.log(err);
  }
});
