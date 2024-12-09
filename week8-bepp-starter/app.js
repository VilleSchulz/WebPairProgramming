import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { requestLogger, unknownEndpoint, errorHandler } from "./middleware/customMiddleware.js";
import todoTaskRouter from "./routers/todoTaskRouter.js";
import userRouter from "./routers/userRouter.js";
import tourRouter from "./routers/tourRouter.js";
dotenv.config();

// express app
const app = express();

connectDB();

// middleware
app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.get("/", (req, res) => res.send("API Running!"));

app.use("/api/todoTasks", todoTaskRouter);
app.use("/api/users", userRouter);
app.use("/api/tours", tourRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
