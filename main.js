var http = require('http');
var querystring = require('querystring');
var url = require('url');
var express = require('express')
var fs = require('fs')
app = express();
var datab = require('./init_database.js');
session = require('express-session');
var tools = require('./tools.js');
var connect = require('./connection.js');
var inscript = require('./inscription.js');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false });



// parse application/json
var main_page = require('./main_page.js');
var users;

global.con = datab.connect_database("localhost", "root", "1234");
function session(phpid)
{
    this.phpid = phpid;
}

app.use(session({secret: "Shh, its a secret!"}))

.use('/test', tools.test)

.get('/', function(req, res) {
    /*
       fs.readFile('header.html', 'utf8', function (err, data){
       if (err) {
       console.log(err);
       res.end('Error interne');
       }
    /*  else
    {
    res.end(data);
    }

    });*/
})



.use('/connection', function(req, res) {
    if (req.session.is_connected) {
        res.end("Deja connecte");
    }
    else {
        tools.get_post(req, function (data) {
            if (data.pseudo || data.email || data.password) {
                datab.logValid("admin", "admin", function (bool) {
                    if (bool) {
                        req.session.pseudo = data.pseudo;
                        req.session.is_connected = true;
                        connect.connection_success(req,res);
                    }
                    else {
                        connect.connection(req,res);
                    }
                });
            }
            else {
                connect.connection(req, res);
            }
        });
    }

})
.use('/inscription', function(req,res) {
    if (req.session.is_connected) {
        res.end("Pas d'accès connecte normalement");
    }

    inscript.inscription(req, res);

})
.use('/main_page', function(req, res) {
    /*if (req.session.is_connected == null ){
      res.end("Vous devez être connecté");
      }*/
console.log(req.body);
    console.log("coucou");
    main_page.main_page(req, res);

})

.listen(8080);



