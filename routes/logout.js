var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
  req.session.destroy();//セッションをぶち殺す
  res.redirect('/login');

});

module.exports = router;
