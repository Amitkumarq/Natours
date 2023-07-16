const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, 'provide duration to the tour'],
    },
    difficulty: {
      type: String,
      required: [true, 'Provide difficulty to a Tour'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'provide group size to a tour'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.0,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have price field'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'tour must have a summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  }
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true }

  // }
);

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
