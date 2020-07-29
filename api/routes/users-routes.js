const express = require('express');

const HttpError = require('../models/http-error');

const router = express.Router();

const DUMMY_USERS = [
  {
    uid: 'user1',
    username: 'user1',
    password: 'password',
    email: 'user1@example.com',
    avatar: 'https://pickaface.net/gallery/avatar/20160625_050020_889_FAKE.png',
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
  if (DUMMY_USERS.length === 0) {
    throw new HttpError('No users found.', 404);
  }

  res.json({ places: DUMMY_USERS });
});

router.get('/:uid', (req, res, next) => {
  const userId = req.params.uid;
  const user = DUMMY_USERS.find(u => u.uid === userId);

  if (!user) {
    throw new HttpError('No user found.', 404);
  }

  res.json({ user });
});

router.get('/:uid/comments', (req, res, next) => {
  const userId = req.params.uid;
  const comments = DUMMY_COMMENTS.filter(c => c.uid === userId);

  if (comments.length === 0) {
    throw new HttpError('No comments found.', 404);
  }

  res.json({ comments });
});

module.exports = router;
