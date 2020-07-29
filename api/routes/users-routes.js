const express = require('express');
const { check } = require('express-validator');

const usersControllers = require('../controllers/users-controllers');

const router = express.Router();

router.get('/', usersControllers.getUsers);

router.get('/:uid', usersControllers.getUserByUid);

router.post('/signup', [check('username').not().isEmpty(), check('email').normalizeEmail().isEmail(), check('password').not().isEmpty()], usersControllers.signup);

router.post('/login', [check('email').normalizeEmail().isEmail(), check('password').not().isEmpty()], usersControllers.login);

router.patch('/:uid', [check('username').not().isEmpty(), check('email').normalizeEmail().isEmail(), check('password').not().isEmpty()], usersControllers.updateUser);

router.delete('/:uid', usersControllers.deleteUser);

module.exports = router;
