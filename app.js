require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

//const dotenv = require('dotenv');
const connectDB = require('./connect/db');
mongoose.set('strictQuery', true);

const appError = require('./utils/appError');
const tourRouter = require('./Routes/tourRoute');

const app = express();
app.use(express.json());
app.use('/api/v1/tours', tourRouter);
//app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    err: err.status,
    message: err.message,
  });
});

const port = process.env.PORT || 8080;
const start = async () => {
  try {
    // connectDB
    await connectDB();
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
