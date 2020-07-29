const HttpError = require('../models/http-error');

const DUMMY_PLACES = [
  {
    pid: 'p1',
    world_heritage_list: {
      name: 'Empire State Building',
      description: 'One of the most famous sky scrapers in the world!',
      latitude: 40.7484474,
      longitude: -73.9871516,
    },
  },
];

const getPlaces = (req, res, next) => {
  if (!DUMMY_PLACES || DUMMY_PLACES.length === 0) {
    throw new HttpError('No places found.', 404);
  }

  res.json({ places: DUMMY_PLACES });
};

const getPlaceByPid = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find(p => p.pid === placeId);

  if (!place) {
    throw new HttpError('No place found.', 404);
  }

  res.json({ place });
};

exports.getPlaces = getPlaces;
exports.getPlaceByPid = getPlaceByPid;
