var express = require('express');
var router = express.Router();
var connection = require('../mysqlConection');

router.get('/', function(req, res, next) {
  if (req.session.user_id) {
    res.redirect('/');
  } else {
    res.render('login', {
      title: 'ログイン',
      page_name: 'ログイン'
    });
  };
});

router.post('/', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var query = 'SELECT id FROM users WHERE email = "' + email + '" AND password = "' + password + '" LIMIT 1';
  connection.query(query, function(err, rows) {
    console.log(rows);
    var userId = rows.length? rows[0].id: false;
    console.log(userId);
    if (userId) {
      req.session.user_id = userId;
      res.redirect('/');
    } else {
      res.render('login', {
        title: 'ログイン',
        page_name: 'ログイン',
        noUser: 'メールアドレスとパスワードが一致するユーザーはいません'
      });
    };
  });
});

module.exports = router;
