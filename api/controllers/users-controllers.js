const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const User = require('../models/user');
const Comment = require('../models/comment');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError('Fetching users failed.', 500);
    return next(error);
  }

  if (!users || users.length === 0) {
    const error = new HttpError('No users found.', 404);
    return next(error);
  }

  res.json({ users: users.map(user => user.toObject({ getters: true })) });
};

const getUserByUid = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findOne({ uid: userId });
  } catch (err) {
    const error = new HttpError('Could not find user.', 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError('No user found.', 404);
    return next(error);
  }

  res.json({ user: user.toObject({ getters: true }) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError('Invalid inputs.', 422);
    return next(error);
  }

  // uid is not extracted from req.body since uuid() will allocate one
  const {
    username, password, email, createTime,
  } = req.body;

  // Check existing mail
  let existingEmail;
  try {
    existingEmail = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError('Signing up failed.', 500);
    return next(error);
  }

  if (existingEmail) {
    const error = new HttpError('Email exists already.', 422);
    return next(error);
  }

  // Check existing username
  let existingUsername;
  try {
    existingUsername = await User.findOne({ username });
  } catch (err) {
    const error = new HttpError('Signing up failed.', 500);
    return next(error);
  }

  if (existingUsername) {
    const error = new HttpError('Username exists already.', 422);
    return next(error);
  }

  const createdUser = new User({
    uid: uuidv4(),
    username,
    password,
    email,
    avatar: req.file.path,
    createTime: getCreateTime(),
    places: []
  });

  try {
    console.log(createdUser);
    console.log("creating new user");
    await createdUser.save();
  } catch (err) {
    console.log(err);
    console.log("fail to save new user");
    const error = new HttpError('Signing up failed.', 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

function getCreateTime(){
  return Date.now().toString();
}

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError('Logging in failed.', 500);
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError('Invalid credentials.', 401);
    return next(error);
  }

  res.json({
    message: 'Log in successfully.' ,
    user: existingUser.toObject({ getters: true })
  });
};

const updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError('Invalid inputs.', 422);
    return next(error);
  }

  const {
    username, password, email, avatar,
  } = req.body;
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findOne({ uid: userId });
  } catch (err) {
    const error = new HttpError('Updating user failed.', 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError('No user found.', 404);
    return next(error);
  }

  // Check existing mail
  let existingEmail;
  try {
    existingEmail = await User.findOne({ $and: [{ email }, { $nor: [{ uid: userId }] }] });
  } catch (err) {
    const error = new HttpError('Updating failed.', 500);
    return next(error);
  }

  if (existingEmail) {
    const error = new HttpError('Email exists already.', 422);
    return next(error);
  }

  // Check existing username
  let existingUsername;
  try {
    existingUsername = await User.findOne({ $and: [{ username }, { $nor: [{ uid: userId }] }] });
  } catch (err) {
    const error = new HttpError('Updating failed.', 500);
    return next(error);
  }

  if (existingUsername) {
    const error = new HttpError('Username exists already.', 422);
    return next(error);
  }

  user.username = username;
  user.password = password;
  user.email = email;
  user.avatar = avatar;

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError('Update user failed.', 500);
    return next(error);
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

const deleteUser = async (req, res, next) => {
  // getUserByUid
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findOne({ uid: userId });
  } catch (err) {
    const error = new HttpError('Delete user failed.', 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError('No user found.', 404);
    return next(error);
  }

  // getCommentsByUid
  let comments;
  // No need to check !comments
  try {
    comments = await Comment.find({ uid: userId });
  } catch (err) {
    const error = new HttpError('Could not find comments.', 500);
    return next(error);
  }

  try {
    // Deleting user and its comments must be both completed
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await user.remove({ session: sess });

    const promiseArray = [];
    comments.forEach(comment => promiseArray.push(comment.remove({ session: sess })));
    await Promise.all(promiseArray);

    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError('Delete user failed.', 500);
    return next(error);
  }

  res.status(200).json({ message: 'Deleted user.' });
};

exports.getUsers = getUsers;
exports.getUserByUid = getUserByUid;
exports.signup = signup;
exports.login = login;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
