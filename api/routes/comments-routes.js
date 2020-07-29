const express = require('express');

const HttpError = require('../models/http-error');

const router = express.Router();

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
  if (DUMMY_COMMENTS.length === 0) {
    throw new HttpError('No comments found.', 404);
  }

  res.json({ comments: DUMMY_COMMENTS });
});

module.exports = router;
