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
  var query = 'SELECT id FROM users WHERE email = "' + email + '" AND password = "' + password + '" LIMIT 1';//limitで引っ張ってくる値の個数を指定
  connection.query(query, function(err, rows) {
    var userId = rows.length? rows[0].id: false;//三項演算子（条件式?真の場合に返す値:偽の場合に返す値）
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
