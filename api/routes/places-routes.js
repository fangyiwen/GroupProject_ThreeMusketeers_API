const express = require('express');

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

router.get('/:pid/comments', (req, res, next) => {
  const placeId = req.params.pid;
  const comments = DUMMY_COMMENTS.filter(c => c.pid === placeId);
  res.json({ comments });
});

router.get('/:pid', (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find(p => p.pid === placeId);
  res.json({ place });
});

router.get('/', (req, res, next) => {
  res.json({ places: DUMMY_PLACES });
});

module.exports = router;
