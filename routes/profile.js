var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConection');


router.get('/:user_id',function(req,res,next){
  var userId_s=req.session.user_id;
  var userId_p=req.params.user_id;
  if(userId_s==userId_p){
    var userId=req.params.user_id;
    var getQuery='SELECT * FROM users WHERE id="'+userId+'"';
    connection.query(getQuery,function(err,get){
      res.render('profile',{
        page_name:'profile',
        user:get[0]
      });
    });
}else{
  res.redirect('/login');
};
});


module.exports = router;
