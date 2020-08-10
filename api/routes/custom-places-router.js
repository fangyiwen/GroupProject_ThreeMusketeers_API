const express = require('express');
const { check } = require('express-validator');

const customPlacesControllers = require('../controllers/custom-place-controller');

const router = express.Router();
const fileUpload = require('../middleware/file-upload');

router.get('/user/:uid', customPlacesControllers.getPlacesByUserId);

router.get('/:pid', customPlacesControllers.getPlaceById);

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
    customPlacesControllers.createPlace
);

module.exports = router;
