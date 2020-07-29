const express = require('express');

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

router.get('/:uid/comments', (req, res, next) => {
  const userId = req.params.uid;
  const comments = DUMMY_COMMENTS.filter(c => c.uid === userId);
  res.json({ comments });
});

router.get('/:uid', (req, res, next) => {
  const userId = req.params.uid;
  const user = DUMMY_USERS.find(u => u.uid === userId);
  res.json({ user });
});

module.exports = router;
