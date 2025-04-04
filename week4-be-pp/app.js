const express = require("express");
const app = express();
const userRouter = require('./routes/userRoute');
const tourRouter = require('./routes/tourRoute')


const morgan = require('morgan');
app.use(morgan('tiny'));
// Middleware to parse JSON
app.use(express.json());

app.use('/api/users',userRouter);


app.use('/api/tours',tourRouter)

const port = 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});