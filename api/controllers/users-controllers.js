const HttpError = require('../models/http-error');

const DUMMY_USERS = [
  {
    uid: 'user1',
    username: 'user1',
    password: 'password',
    email: 'user1@example.com',
    avatar: 'https://pickaface.net/gallery/avatar/20160625_050020_889_FAKE.png',
  },
];

const getUsers = (req, res, next) => {
  if (DUMMY_USERS.length === 0) {
    throw new HttpError('No users found.', 404);
  }

  res.json({ users: DUMMY_USERS });
};

const getUserByUid = (req, res, next) => {
  const userId = req.params.uid;
  const user = DUMMY_USERS.find(u => u.uid === userId);

  if (!user) {
    throw new HttpError('No user found.', 404);
  }

  res.json({ user });
};

exports.getUsers = getUsers;
exports.getUserByUid = getUserByUid;
