var mysql=require('mysql');//mysqlに接続するんご

var dbConfig={
  host: '127.0.0.1',
 user: 'root',
 password: '',
 database: 'ScheduleShare'
}

var connection=mysql.createConnection(dbConfig);

module.exports=connection;
