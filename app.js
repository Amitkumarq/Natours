require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
const connectDB = require('./connect/db');
mongoose.set('strictQuery', true);

const tourRouter = require('./Routes/tourRoute');

const app = express();
app.use(express.json());
app.use('/api/v1/tours', tourRouter);

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