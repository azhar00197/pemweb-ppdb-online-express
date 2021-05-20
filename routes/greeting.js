const routes = require('express').Router();

routes.get('/', (_, res) => {
  res.send({ message: 'Application is working' });
});

module.exports = routes;
