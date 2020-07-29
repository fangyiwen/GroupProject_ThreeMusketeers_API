const express = require('express');

const HttpError = require('../models/http-error');

const router = express.Router();

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

const DUMMY_COMMENTS = [
  {
    pid: 'p1',
    text: 'I love this good place!',
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/NARA_Empire_State_Building.jpg/220px-NARA_Empire_State_Building.jpg'],
    uid: 'user1',
    createTime: '1596017863',
  },
];

router.get('/', (req, res, next) => {
  if (DUMMY_PLACES.length === 0) {
    throw new HttpError('No places found.', 404);
  }

  res.json({ places: DUMMY_PLACES });
});

router.get('/:pid', (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find(p => p.pid === placeId);

  if (!place) {
    throw new HttpError('No place found.', 404);
  }

  res.json({ place });
});

router.get('/:pid/comments', (req, res, next) => {
  const placeId = req.params.pid;
  const comments = DUMMY_COMMENTS.filter(c => c.pid === placeId);

  if (comments.length === 0) {
    throw new HttpError('No comments found.', 404);
  }

  res.json({ comments });
});

module.exports = router;
