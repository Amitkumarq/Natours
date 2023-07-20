const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/').get(tourController.getAllTours);
router.route('/').post(tourController.createTours);

router.route('/:id').get(tourController.getTour);
router.route('/:id').patch(tourController.updateTours);
router.route('/:id').delete(tourController.deleteTours);

module.exports = router;
