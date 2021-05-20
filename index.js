const express = require('express');

const App = express();
const Routes = require('./routes');

App.use(express.json());
App.use(Routes);

const port = process.env.PORT || 3000;

App.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
