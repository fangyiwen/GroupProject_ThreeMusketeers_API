const express = require('express');

const commentsControllers = require('../controllers/comments-controllers');

const router = express.Router();

router.get('/', commentsControllers.getComments);

router.get('/places/:pid', commentsControllers.getCommentsByPid);

router.get('/users/:uid', commentsControllers.getCommentsByUid);

router.post('/', commentsControllers.createComment);

router.patch('/:cid', commentsControllers.updateComment);

router.delete('/:cid', commentsControllers.deleteComment);

module.exports = router;
