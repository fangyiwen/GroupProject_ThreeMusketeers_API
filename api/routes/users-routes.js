const express = require('express');

const usersControllers = require('../controllers/users-controllers');

const router = express.Router();

router.get('/', usersControllers.getUsers);

router.get('/:uid', usersControllers.getUserByUid);

router.post('/', usersControllers.createUser);

module.exports = router;
