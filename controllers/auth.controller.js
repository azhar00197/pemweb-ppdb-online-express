const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConf = require('../config/jwt.config.json');

const generateToken = (email) => jwt.sign({ email }, jwtConf.secret, {
  expiresIn: '6h',
});

const login = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array({ onlyFirstError: true }) });
    return;
  }
  global.models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user === null) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      res.send({
        access_token: generateToken(user.email),
        expires_in: 21600,
      });
    }).catch((e) => {
      res.status(500).json(`Error: ${e}`);
    });
};

const register = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array({ onlyFirstError: true }) });
    return;
  }
  if (req.body.password !== req.body.password_confirmation) {
    res.status(422).json({
      errors: {
        msg: 'Password konfirmasi tidak cocok',
        location: 'body',
        param: 'password_confirmation',
      },
    });
    return;
  }
  global.models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user === null) {
        const { email, name, password } = req.body;
        global.models.User.create({
          email,
          name,
          password: bcrypt.hashSync(password, 10),
        }).then(() => {
          res.send({
            access_token: generateToken(req.body.email),
            expires_in: 21600,
          });
        }).catch((e) => {
          res.status(500).json({ error: `Server error: ${e}` });
        });
      } else {
        res.status(409).json({ error: 'Email telah dipakai.' });
      }
    })
    .catch((e) => {
      res.status(500).json({ error: `DB error: ${e}` });
    });
};

module.exports = { login, register };
