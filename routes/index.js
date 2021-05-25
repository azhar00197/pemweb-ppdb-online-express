const routes = require('express').Router();
const GreetingRoutes = require('./greeting');
const AuthRoutes = require('./auth');

routes.use('/auth', AuthRoutes);
routes.use(GreetingRoutes);

routes.get('*', (_, res) => {
  res.status(404).json({ error: 'Endpoint Not Found' });
});

module.exports = routes;
