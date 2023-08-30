const mongoose = require('mongoose');
const connectionString = process.env.MONGO_URI;
const connectDB = (url) => {
  return mongoose
    .connect(connectionString, { useNewUrlParser: true })
    .then(() => console.log('connected to the DB...'))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
