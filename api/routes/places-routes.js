const express = require('express');
const { check } = require('express-validator');

const placesControllers = require('../controllers/places-controllers');

const router = express.Router();
const fileUpload = require('../middleware/file-upload');

router.get('/', placesControllers.getPlaces);

router.get('/:pid', placesControllers.getPlaceByPid);

router.post(
  '/',
  fileUpload.single('avatar'),
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address')
      .not()
      .isEmpty(),
  ],
  // placesControllers.createPlace
);

module.exports = router;
