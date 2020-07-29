const usersRouter = require('express').Router();
const { getAllUsers, createUser, getUserById } = require('../controllers/users');

usersRouter.get('/', getAllUsers);
usersRouter.post('/', createUser);
usersRouter.get('/:userId', getUserById);

module.exports = usersRouter;
