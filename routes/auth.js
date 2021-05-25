const { Router } = require('express');
const { body } = require('express-validator');
const { login, register } = require('../controllers/auth.controller');

const routes = Router();

routes.post('/login', [
  body('email').isString(),
  body('password').isLength({ min: 8 }),
  login,
]);

routes.post('/register', [
  body('email').isString(),
  body('password').isLength({ min: 8 }),
  body('password_confirmation').isLength({ min: 8 }),
  body('name').isString(),
  register,
]);

module.exports = routes;
