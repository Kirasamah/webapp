
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');


var things = require('./routes/things'); 
var app = express();
var fs = require('fs');

var connection  = require('express-myconnection'); 
var mysql = require('mysql');


app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'client')));


if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//mysql-connection
app.use(  
    connection(mysql,{
        
        host: 'localhost',
        user: 'root',
        password : 'rootroot',
        database:'users'

    },'pool')

);

//routes, start with index
app.get('/', routes.index);
app.get('/things', things.list);
app.get('/things/add', things.add);
app.post('/things/add', things.save);
app.get('/things/delete/:id', things.delete_thing);
app.get('/things/edit/:id', things.edit);
app.post('/things/edit/:id',things.save_edit);
app.get('/things/map/:id',things.map);


app.use(app.router);
//activating server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});