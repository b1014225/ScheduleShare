var express = require('express');
var router = express.Router();
var connection = require('../mysqlConection');
var multer = require('multer');//画像の情報をアップロードするためのモジュール
var upload = multer({ dest: './public/images/uploads/' });

router.get('/:user_id',function(req,res,next){
  var userId_s=req.session.user_id;
  var userId_p=req.params.user_id;
  if(userId_s==userId_p){
  var userId=req.params.user_id;
  var getQuery='SELECT * FROM users WHERE id="'+userId+'"';
  connection.query(getQuery,function(err,get){
    res.render('edit_prof',{
      page_name:'edit_profile',
      user:get[0]
    });
  });
}else{
  res.redirect('/login');
};
});




module.exports = router;
