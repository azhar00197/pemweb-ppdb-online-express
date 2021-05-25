const { Sequelize } = require('sequelize');
const DbConfig = require('../config/db.config.json');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: DbConfig.mysql.host,
  username: DbConfig.mysql.username,
  password: DbConfig.mysql.password,
  database: DbConfig.mysql.dbname,
});
const User = require('./User')(sequelize);

module.exports = { sequelize, User };
