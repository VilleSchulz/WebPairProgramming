require("dotenv").config();
const port = process.env.PORT || 4000;
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const tourRouter = require("./routes/tourRouter");
const userRouter = require("./routes/userRouter");
const {
  unknownEndpoint,
  errorHandler,
} = require("./middleware/customMiddleware");

const morgan = require("morgan");
app.use(morgan("dev"));

// Middleware to parse JSON
app.use(express.json());
connectDB();
// Use the tourRouter for all "/tours" routes
app.use("/api/tours", tourRouter);

// Use the userRouter for all /users routes
app.use("/api/users", userRouter);
// Example route that throws an error
app.get("/error", (req, res, next) => {
  // Trigger an error
  const error = new Error("Something went wrong!");
  next(error);
});

app.use(unknownEndpoint);
// app.use(errorHandler);
app.use(errorHandler);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
