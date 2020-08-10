const express = require('express');

const placesControllers = require('../controllers/places-controllers');

const router = express.Router();

router.get('/', placesControllers.getPlaces);

router.get('/:pid', placesControllers.getPlaceByPid);

module.exports = router;
