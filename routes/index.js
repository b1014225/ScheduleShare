var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConection');

/* GET home page. */
router.get('/', function(req, res, next) {
  var getQuery='SELECT *,DATE_FORMAT(scheduleAt, \'%Y/%m/%d %k:%i~\') AS scheduleAt FROM schedules';
  connection.query(getQuery,function(err,get){
    var userId=req.session.user_id;
    if(userId){
  res.render('index',{
  schedules: get,
  page_name: 'Index'
});
}else{
  res.redirect('/login');
};
});
});

router.post('/',function(req,res,next){
  var title=req.body.title;
  var content=req.body.content;
  var year=req.body.year;
  var month=req.body.month;
  var day =req.body.day;
  var hour=req.body.hour;
  var minute=req.body.minute;
  var scheduleAt=moment({years:year,months:month,days:day,hours:hour,minutes:minute,seconds:null}).format('YYYY-MM-DD HH:mm:ss');
  var setQuery='INSERT INTO schedules (title,content,scheduleAt) VALUES ("' + title + '" , ' + '"' + content + '",'+'"'+scheduleAt+'")';
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
