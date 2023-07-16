const Tour = require('../Models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    // Build Query
    const queryObj = { ...req.body };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    const query = Tour.find(queryObj);

    // Execute Query
    const tours = await query;

    //Response
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(404).send(err);
  }
};

exports.getTour = async (req, res) => {
  try {
    const ID = req.params.id;
    const tour = await Tour.findById(ID);
    // Tour.findOne({ _id: req.params.id})
    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (err) {
    res.status(404).send(err);
  }
};

exports.createTours = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(404).json({ msg: err, status: 'fail' });
  }
};

exports.updateTours = async (req, res) => {
  try {
    const updateTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      status: 'success',
      data: {
        tour: updateTour,
      },
    });
  } catch (err) {
    res.status(404).json({ msg: err, status: 'fail' });
  }
};

exports.deleteTours = async (req, res) => {
  try {
    const newTour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', msg: err });
  }
};
