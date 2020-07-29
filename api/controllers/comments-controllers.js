const HttpError = require('../models/http-error');

const DUMMY_COMMENTS = [
  {
    pid: 'p1',
    text: 'I love this good place!',
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/NARA_Empire_State_Building.jpg/220px-NARA_Empire_State_Building.jpg'],
    uid: 'user1',
    createTime: '1596017863',
  },
];

const getComments = (req, res, next) => {
  if (DUMMY_COMMENTS.length === 0) {
    throw new HttpError('No comments found.', 404);
  }

  res.json({ comments: DUMMY_COMMENTS });
};

const getCommentsByPid = (req, res, next) => {
  const placeId = req.params.pid;
  const comments = DUMMY_COMMENTS.filter(c => c.pid === placeId);

  if (comments.length === 0) {
    throw new HttpError('No comments found.', 404);
  }

  res.json({ comments });
};

const getCommentsByUid = (req, res, next) => {
  const userId = req.params.uid;
  const comments = DUMMY_COMMENTS.filter(c => c.uid === userId);

  if (comments.length === 0) {
    throw new HttpError('No comments found.', 404);
  }

  res.json({ comments });
};

const createComment = (req, res, next) => {
  const {
    pid, text, images, uid, createTime,
  } = req.body;
  const createdComment = {
    pid,
    text,
    images,
    uid,
    createTime,
  };

  DUMMY_COMMENTS.push(createdComment);

  res.status(201).json({ comment: createdComment });
};

exports.getComments = getComments;
exports.getCommentsByPid = getCommentsByPid;
exports.getCommentsByUid = getCommentsByUid;
exports.createComment = createComment;
