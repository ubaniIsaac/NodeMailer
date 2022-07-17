const express = require('express');

const { signup } = require('../controllers/user.controller')

const userRouter = express.Router();

userRouter.post('/signup', signup)

module.exports = userRouter;
