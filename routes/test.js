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

router.get('/',function(req,res,next){
  res.render('test',{
    page_name:'test'
  });
});

router.post('/',upload.single('image_file'),function(req,res){
  var path = req.file.path;
  console.log(path);
  res.redirect('/test');
});


module.exports = router;
