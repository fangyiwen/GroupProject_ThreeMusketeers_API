const express = require('express');
const { check } = require('express-validator');

const customPlacesControllers = require('../controllers/custom-place-controller');

const router = express.Router();
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');

router.get('/user/:uid', customPlacesControllers.getPlacesByUserId);

router.get('/:pid', customPlacesControllers.getPlaceById);

router.use(checkAuth);

router.post(
  '/',
  fileUpload.single('image'),
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address')
      .not()
      .isEmpty(),
  ],
  customPlacesControllers.createPlace,
);

router.patch(
  '/:pid',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 }),
  ],
  customPlacesControllers.updatePlace,
);

router.delete('/:pid', customPlacesControllers.deletePlace);

module.exports = router;
