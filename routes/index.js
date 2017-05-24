var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConection');

/* GET home page. */
router.get('/', function(req, res, next) {
  var userId=req.session.user_id;
  var getQuery = 'SELECT S.id, S.title,S.content,DATE_FORMAT(S.scheduleAt, \'%Y/%m/%d %k:%i~\') AS scheduleAt,S.user_id,U.user_name,U.image_path FROM schedules S LEFT OUTER JOIN users U ON S.user_id = U.id ORDER BY S.scheduleAt';
  var Query='SELECT *,DATE_FORMAT(scheduleAt, \'%Y/%m/%d %k:%i~\') AS scheduleAt FROM schedules';
  if(userId){
  connection.query(getQuery,function(err,get){
    var get1Query='SELECT * FROM users WHERE id="'+userId+'"';
  connection.query(get1Query,function(err,get1){
    console.log(get);
    console.log(get1);
  res.render('index',{
  schedules: get,
  page_name: 'Index',
  user:get1[0]
});
});
});
}else{
  res.redirect('/login');
};
});

router.post('/',function(req,res,next){
  var title=req.body.title;
  var content=req.body.content;
  var year=req.body.year;
  var month=req.body.month;
  var day =req.body.day;
  var hour=req.body.hour;
  var minute=req.body.minute;
  var userId =req.session.user_id;
  var scheduleAt=moment({years:year,months:month,days:day,hours:hour,minutes:minute,seconds:null}).format('YYYY-MM-DD HH:mm:ss');
  var setQuery='INSERT INTO schedules (title,content,scheduleAt,user_id) VALUES ("' + title + '" , ' + '"' + content + '",'+'"'+scheduleAt+'",'+'"'+userId+'")';
  connection.query(setQuery,function(err,rows){
    res.redirect('/');
  });
});

router.delete('/:delete_id', function(req, res, next) {
  var id=req.params.delete_id;
  var deleteQuery ='DELETE FROM schedules WHERE id = "'+id+'"';
  console.log(deleteQuery);
  connection.query(deleteQuery, function(err, rows) {
    res.redirect('/');
  });
});

router.put('/:update_id',function(req,res,next){
  var id=req.params.update_id;
  var title=req.body.title;
  var content=req.body.content;
  var year=req.body.year;
  var month=req.body.month;
  var day =req.body.day;
  var hour=req.body.hour;
  var minute=req.body.minute;
  var scheduleAt=moment({years:year,months:month,days:day,hours:hour,minutes:minute,seconds:null}).format('YYYY-MM-DD HH:mm:ss');
  var updateQuery='UPDATE schedules SET title="'+title+'",content='+'"'+content+'",scheduleAt='+'"'+scheduleAt+'"WHERE id="'+id+'"';
  connection.query(updateQuery,function(err,rows){
    res.redirect('/');
  });
});

module.exports = router;


//moment({years: 2013, months: 2, days: 8, hours: 9, minutes: 30, seconds: 26}) // オブジェクトで設定
