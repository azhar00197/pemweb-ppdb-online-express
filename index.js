const express = require('express');
const Models = require('./models');

const App = express();
const Routes = require('./routes');

App.use(express.json());
App.use(Routes);

const port = process.env.PORT || 3000;

global.models = Models;

Models.sequelize.sync().then(() => {
  App.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
