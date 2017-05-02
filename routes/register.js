var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConection');

router.get('/',function(req,res,next){
  res.render('register',{
    title: '新規会員登録',
    page_name: 'サインアップ'
  });
});

router.post('/',function(req,res,next){
  var user_name=req.body.user_name;
  var email=req.body.email;
  var password=req.body.password;
  var setQuery='INSERT INTO users (user_name,email,password) VALUES ("'+user_name+'",'+'"'+email+'",'+'"'+password+'")';
  var getQuery='SELECT * FROM users WHERE email = "' + email + '" LIMIT 1';
  connection.query(getQuery,function(err,existEmail){
    var exist=existEmail.length===1;
    if(exist){
      res.render('register', {
        title: '新規会員登録',
        page_name: 'サインアップ',
        user_name: '',
        emailExists: '既に登録されているメールアドレスです'
      });
    }else{
      connection.query(setQuery,function(){
        res.redirect('/register');
      });
    };
  });
});


module.exports = router;
