import {validationResult} from "express-validator";

const HttpError = require('../models/http-error');
const Place = require('../models/place');

const getPlaces = async (req, res, next) => {
  let places;
  try {
    places = await Place.find();
  } catch (err) {
    const error = new HttpError('Fetching places failed.', 500);
    return next(error);
  }

  if (!places || places.length === 0) {
    const error = new HttpError('No places found.', 404);
    return next(error);
  }

  res.json({ places: places.map(place => place.toObject({ getters: true })) });
};

const getPlaceByPid = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findOne({ pid: placeId });
  } catch (err) {
    const error = new HttpError('Could not find a place.', 500);
    return next(error);
  }

  if (!place) {
    const error = new HttpError('No place found.', 404);
    return next(error);
  }

  res.json({ place: place.toObject({ getters: true }) });
};

//todo: add create place function


exports.getPlaces = getPlaces;
exports.getPlaceByPid = getPlaceByPid;
