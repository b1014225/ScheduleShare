//var express = require('express');
//var router = express.Router();
//var connection = require('../mysqlConection');
//var multer = require('multer');//画像の情報をアップロードするためのモジュール
//var upload = multer({ dest: './public/images/uploads/' });//画像のアップロード先の設定
//var cloudinary = require('cloudinary');//cloudinaryに画像を送るためのモジュール
//cloudinary.config({//cloudinaryの設定のためのオブジェクトを書いてる
//  cloud_name: 'do24bticc',
//  api_key: '967982211994312',
  //api_secret: 'O9HNz_Qs6PrsJ1-HSXTb_Ahk9P0'
//});

var express = require('express');
var router = express.Router();
var moment = require('moment');
var multer = require('multer');
var connection = require('../mysqlConection');
var upload = multer({ dest: './public/images/uploads/' });
var cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'do24bticc',
  api_key: '967982211994312',
  api_secret: 'O9HNz_Qs6PrsJ1-HSXTb_Ahk9P0'
});


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

router.put('/:user_id',function(req,res){
  var userId=req.params.user_id;
  var user_name=req.body.user_name;
  var email=req.body.email;
  var password=req.body.password;
  var text=req.body.text;
  var profUpdateQuery='UPDATE users SET user_name="'+user_name+'",email='+'"'+email+'",password='+'"'+password+'",text='+'"'+text+'"WHERE id="'+userId+'"';
     connection.query(profUpdateQuery,function(err,rows){
       res.redirect('/profile/'+userId);
     });
  });

  router.post('/:user_id',upload.single('prof_img_file'),function(req,res){
    var path = req.file.path;
    console.log(path);
    cloudinary.uploader.upload(path,function(result){
       var image_path = result.url;
       var userId=req.params.user_id;
       var profUpdateQuery='UPDATE users SET image_path='+'"'+image_path+'"WHERE id="'+userId+'"';
       connection.query(profUpdateQuery,function(err,rows){
         res.redirect('/profile/'+userId);
       });
     });
  });

module.exports = router;
