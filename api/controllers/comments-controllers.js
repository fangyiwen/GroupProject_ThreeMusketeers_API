const { v4: uuidv4 } = require('uuid');

const HttpError = require('../models/http-error');

let DUMMY_COMMENTS = [
  {
    cid: 'c1',
    pid: 'p1',
    text: 'I love this good place!',
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/NARA_Empire_State_Building.jpg/220px-NARA_Empire_State_Building.jpg'],
    uid: 'user1',
    createTime: '1596017863',
  },
];

const getComments = (req, res, next) => {
  if (!DUMMY_COMMENTS || DUMMY_COMMENTS.length === 0) {
    throw new HttpError('No comments found.', 404);
  }

  res.json({ comments: DUMMY_COMMENTS });
};

const getCommentsByPid = (req, res, next) => {
  const placeId = req.params.pid;
  const comments = DUMMY_COMMENTS.filter(c => c.pid === placeId);

  if (!comments || comments.length === 0) {
    throw new HttpError('No comments found.', 404);
  }

  res.json({ comments });
};

const getCommentsByUid = (req, res, next) => {
  const userId = req.params.uid;
  const comments = DUMMY_COMMENTS.filter(c => c.uid === userId);

  if (!comments || comments.length === 0) {
    throw new HttpError('No comments found.', 404);
  }

  res.json({ comments });
};

const createComment = (req, res, next) => {
  const {
    pid, text, images, uid, createTime,
  } = req.body;
  const createdComment = {
    cid: uuidv4(),
    pid,
    text,
    images,
    uid,
    createTime,
  };

  DUMMY_COMMENTS.push(createdComment);

  res.status(201).json({ comment: createdComment });
};

const updateComment = (req, res, next) => {
  const { text, images } = req.body;
  const commentId = req.params.cid;

  const updatedComment = { ...DUMMY_COMMENTS.find(c => c.cid === commentId) };
  const commentIndex = DUMMY_COMMENTS.findIndex(c => c.cid === commentId);
  updatedComment.text = text;
  updatedComment.images = images;

  DUMMY_COMMENTS[commentIndex] = updatedComment;

  res.status(200).json({ comment: updatedComment });
};

const deleteComment = (req, res, next) => {
  const commentId = req.params.cid;
  DUMMY_COMMENTS = DUMMY_COMMENTS.filter(c => c.cid !== commentId);
  res.status(200).json({ message: 'Delete comment.' });
};

exports.getComments = getComments;
exports.getCommentsByPid = getCommentsByPid;
exports.getCommentsByUid = getCommentsByUid;
exports.createComment = createComment;
exports.updateComment = updateComment;
exports.deleteComment = deleteComment;
