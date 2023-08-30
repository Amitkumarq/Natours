const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      validate: [validator.isAlpha, 'name must only allowed characters'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'provide duration to the tour'],
    },
    difficulty: {
      type: String,
      required: [true, 'Provide difficulty to a Tour'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, meduim, difficult',
      },
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'provide group size to a tour'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.0,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have price field'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // This is only points to current doc on NEW document Creation
          return val < this.price;
        },
        message: 'discount ({VALUE}) exceeding the pricing',
      },
    },
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// Document middleware: run before .save() and .create()
//tourSchema.pre('save', function (next) {

// "/^find/" this will used for any query that will start with find keyword i.e findById, findOneAndDelete.
tourSchema.pre(/^find/, function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Query Middleware:
tourSchema.pre('find', function (next) {
  this.find({ secretTour: false });
  next();
});

// Aggregation Middleware
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: false } }); //  .unshift used to push element in front of an array.
  next();
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
