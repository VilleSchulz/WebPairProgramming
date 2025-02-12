require("dotenv").config();
const express = require("express");
const app = express();
const jobRouter = require("./routes/jobRouter");
const {
  unknownEndpoint,
  errorHandler,
} = require("./middleware/customMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");

// Middlewares
app.use(cors()); // CORS (Cross-Origin Resource Sharing) is a middleware in Express.js that automatically allows your server to respond to cross-origin requests from any domain. It is used to request resources from another path than origin. browsers block cross-origin HTTP requests for security reasons so thats why its needed.
app.use(express.json());

connectDB();

// Use the jobRouter for all "/jobs" routes
app.use("/api/jobs", jobRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
