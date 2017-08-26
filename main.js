var http = require('http');
var querystring = require('querystring');
var url = require('url');
var express = require('express')
var fs = require('fs')

var app = express()

var users;

function session(phpid)
{
    this.phpid = phpid;
}

app.get('/', function(req, res) {
        res.setHeader('Content-Type', 'text/plain');
        fs.readFile('header.html', 'utf8', function (err, data){
            if (err) {
                console.log(err);
                res.end('Error interne');
            }
            else
            {
        res.end(data);
            }

        });
});

app.listen(8080);
