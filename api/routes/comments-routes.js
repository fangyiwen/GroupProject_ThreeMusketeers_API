const express = require('express');
const { check } = require('express-validator');

const commentsControllers = require('../controllers/comments-controllers');

const router = express.Router();

router.get('/', commentsControllers.getComments);

router.get('/places/:pid', commentsControllers.getCommentsByPid);

router.get('/users/:uid', commentsControllers.getCommentsByUid);

router.post('/places/:pid', check('text').not().isEmpty(), commentsControllers.createComment);

router.patch('/:cid', check('text').not().isEmpty(), commentsControllers.updateComment);

router.delete('/:cid', commentsControllers.deleteComment);

module.exports = router;
