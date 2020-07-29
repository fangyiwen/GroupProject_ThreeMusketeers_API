const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

let DUMMY_USERS = [
  {
    uid: 'user1',
    username: 'user1',
    password: 'password',
    email: 'user1@example.com',
    avatar: 'https://pickaface.net/gallery/avatar/20160625_050020_889_FAKE.png',
    createTime: '1596017863',
  },
];

const getUsers = (req, res, next) => {
  if (!DUMMY_USERS || DUMMY_USERS.length === 0) {
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

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs.', 422);
  }

  // uid is not extracted from req.body since uuid() will allocate one
  const {
    username, password, email, avatar, createTime,
  } = req.body;

  const hasEmail = DUMMY_USERS.find(u => u.email === email && u.username === username);
  if (hasEmail) {
    throw new HttpError('Failed. Email already exists.', 422);
  }

  const hasUsername = DUMMY_USERS.find(u => u.username === username);
  if (hasUsername) {
    throw new HttpError('Failed. Username already exists.', 422);
  }

  const createdUser = {
    uid: uuidv4(),
    username,
    password,
    email,
    avatar,
    createTime,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ comment: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find(u => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError('Log in failed.', 401);
  }

  res.json({ message: 'Log in successfully.' });
};

const updateUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs.', 422);
  }

  const {
    username, password, email, avatar,
  } = req.body;
  const userId = req.params.uid;

  const updatedUser = { ...DUMMY_USERS.find(u => u.uid === userId) };
  const userIndex = DUMMY_USERS.findIndex(u => u.uid === userId);
  updatedUser.username = username;
  updatedUser.password = password;
  updatedUser.email = email;
  updatedUser.avatar = avatar;

  DUMMY_USERS[userIndex] = updatedUser;

  res.status(200).json({ user: updatedUser });
};

const deleteUser = (req, res, next) => {
  const userId = req.params.uid;
  if (!DUMMY_USERS.find(u => u.id === userId)) {
    throw new HttpError('No user found.', 404);
  }

  DUMMY_USERS = DUMMY_USERS.filter(u => u.uid !== userId);
  res.status(200).json({ message: 'Delete comment.' });
};

exports.getUsers = getUsers;
exports.getUserByUid = getUserByUid;
exports.signup = signup;
exports.login = login;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
