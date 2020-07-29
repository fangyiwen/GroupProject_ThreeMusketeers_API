const express = require('express');

const commentsControllers = require('../controllers/comments-controllers');

const router = express.Router();

router.get('/', commentsControllers.getComments);

router.get('/places/:pid', commentsControllers.getCommentsByPid);

router.get('/users/:uid', commentsControllers.getCommentsByUid);

module.exports = router;
