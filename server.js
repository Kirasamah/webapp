//setup Mysql 
var mysql = require('mysql');
var connection = mysql.createConnection({
	host	: 'localhost',
	user    : 'root', 
	password: 'rootroot',
	database: 'users'
});



var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
const url = require('url');

var http = require('http');
var path = require('path');
//lisaa tavararoute
var routes = require('./routes');
var things = require('./routes/things');


//environments
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//client additions----------------
//where to load static resources, like html/css
app.use(express.static('client'));



app.get('/', routes.index);
app.get('/things', things.list);
app.get('/things/add', things.add);
app.post('/things/add', things.save);
app.get('/things/delete/:id', things.delete_thing);
app.get('/things/edit/:id', things.edit);
app.post('/things/edit/:id',things.save_edit);
app.get('/things/map/:id',things.map);

app.use(app.router);


//app
/*app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html')); //load single view file
});*/

/*
//client additions end---------------

//creating application/json parservar
rawBodySaver = function (req, res, buf, encoding) {
	if(buf && buf.length) {
		req.rawBody = buf.toString(encoding || 'utf8');
	}
}
var jsonParser = bodyParser.json({verify: rawBodySaver});
//create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({extended: false});


//GET kaikkien usereiden tiedot tietokannasta
app.get('/api/users', function (req, res) {
	//res.send('Valmis liuta: ' + JSON.stringify(model))
	connection.query('SELECT * FROM things', function(err, rows, fields) {
		if(err)
			throw err;
		res.format({
			json: function(){
				res.send(JSON.stringify(rows))
			}
		})
	});

})

//LOGIN
app.get('/api/login', function(req,res) {
	var u = url.parse(req.url, true).query.u;
	var p = url.parse(req.url, true).query.p;
	connection.query("SELECT id FROM things WHERE name='" + u + "' AND password='" + p + "';", function(err, rows, fields){
		if(!err)
		{
			if(rows.length>0)
			{
				res.send("You have logged in successfully.");
			}
			else
			{
				res.send("Wrong password");
			}
		}
		else
		{				
			res.send("Error: " + err);
		}
	});
});

//post uuden esineen tiedot
app.post('/api/users/add', urlencodedParser, function (req,res) {
		if(!req.body) 
		return res.sendStatus(400);
		connection.connect();

		var post = {
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		};

		connection.query('INSERT INTO things SET ?', post, function(error) {
			if(error) {
				console.log(error.message);
				res.sendStatus(400);
			}else {
				console.log('success!');
			}
		});

		res.status(201).send('Created');
});

//post update uuden esineen tiedot
app.post('/api/users/update/:userid', urlencodedParser, function (req,res) {
		if(!req.body) 
		return res.sendStatus(400);
		connection.connect();
		var userid = req.params.userid;
		var post = {
			id:   req.params.userid,
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		};

		connection.query('UPDATE things SET ?' + post + ' WHERE id = "' + userid + '";', function(error) {
			if(error) {
				console.log(error.message);
				res.sendStatus(400);
			}else {
				console.log('success!');
			}
		});

		res.status(201).send('Created');
});


//DELETE esineen tiedot
app.get('/api/users/remove/:userid', function(req,res) {
	var userid = req.params.userid;
	connection.query('DELETE FROM things WHERE id = "' + userid + '";', function(err, rows, fields) {
		if(!err)
		{
			res.send("You have deleted an item successfully.");
		}
		else
		{				
			res.send("Error: " + err);
		}
	});
});




/*var model = [
{"id":1, "name":"Trulli", "email":"miu@niu.fi", "password":"password"}
]*/
//GET thing by id
/*
app.get('/api/thing/:thingid', function (req, res) {
	var thingid = req.params.thingid;
	res.send(JSON.stringify(findById(thingid)));
})*/
/*
// POST /api/thing use json bodies
app.post('/api/things', jsonParser, function(req, res){
	if(!req.body) 
		return res.sendStatus(400);
	var athing = findById(req.body.id);
	if(athing) {
		athing.name = req.body.name;
		athing.email = req.body.email;
		athing.password = req.body.password;
	} else {
		console.log('Creating...' + req.body.id);
		model.push(req.body);
		console.log('...Created');
	}
	res.status(201).send('Created');
})

*/

/*
function findById(id) {
	for(var 1 = 0, len = model.length; i<len; i++)
		if(id == model[i].id)
			return model[i];
		return null;
}
*/


app.listen(8080);
console.log("server running on port 8080");
