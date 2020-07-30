const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Comment = require('../models/comment');

const getComments = async (req, res, next) => {
  let comments;
  try {
    comments = await Comment.find();
  } catch (err) {
    const error = new HttpError('Fetching comments failed.', 500);
    return next(error);
  }

  if (!comments || comments.length === 0) {
    const error = new HttpError('No comments found.', 404);
    return next(error);
  }

  res.json({ comments: comments.map(comment => comment.toObject({ getters: true })) });
};

const getCommentsByPid = async (req, res, next) => {
  const placeId = req.params.pid;

  let comments;
  try {
    comments = await Comment.find({ pid: placeId });
  } catch (err) {
    const error = new HttpError('Could not find comments.', 500);
    return next(error);
  }

  if (!comments || comments.length === 0) {
    const error = new HttpError('No comments found.', 404);
    return next(error);
  }

  res.json({ comments: comments.map(comment => comment.toObject({ getters: true })) });
};

const getCommentsByUid = async (req, res, next) => {
  const userId = req.params.uid;

  let comments;
  try {
    comments = await Comment.find({ uid: userId });
  } catch (err) {
    const error = new HttpError('Could not find comments.', 500);
    return next(error);
  }

  if (!comments || comments.length === 0) {
    const error = new HttpError('No comments found.', 404);
    return next(error);
  }

  res.json({ comments: comments.map(comment => comment.toObject({ getters: true })) });
};

const createComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError('Invalid inputs.', 422);
    return next(error);
  }

  const placeId = req.params.pid;
  const {
    text, images, uid, createTime,
  } = req.body;

  const createdComment = new Comment({
    cid: uuidv4(),
    pid: placeId,
    text,
    images,
    uid,
    createTime,
  });

  try {
    await createdComment.save();
  } catch (err) {
    const error = new HttpError('Creating comment failed.', 500);
    return next(error);
  }

  res.status(201).json({ comment: createdComment });
};

const updateComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError('Invalid inputs.', 422);
    return next(error);
  }

  const { text, images } = req.body;
  const commentId = req.params.cid;

  let comment;
  try {
    comment = await Comment.findOne({ cid: commentId });
  } catch (err) {
    const error = new HttpError('Update comment failed.', 500);
    return next(error);
  }

  comment.text = text;
  comment.images = images;

  try {
    await comment.save();
  } catch (err) {
    const error = new HttpError(
      'Update place failed.',
      500,
    );
    return next(error);
  }

  res.status(200).json({ comment: comment.toObject({ getters: true }) });
};

const deleteComment = async (req, res, next) => {
  const commentId = req.params.cid;
  let comment;
  try {
    comment = await Comment.findOne({ cid: commentId });
  } catch (err) {
    const error = new HttpError('Delete comment failed.', 500);
    return next(error);
  }

  try {
    await comment.remove();
  } catch (err) {
    const error = new HttpError('Delete comment failed.', 500);
    return next(error);
  }

  res.status(200).json({ message: 'Deleted comment.' });
};

exports.getComments = getComments;
exports.getCommentsByPid = getCommentsByPid;
exports.getCommentsByUid = getCommentsByUid;
exports.createComment = createComment;
exports.updateComment = updateComment;
exports.deleteComment = deleteComment;
