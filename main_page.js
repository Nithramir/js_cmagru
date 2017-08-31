var formidable = require('formidable');
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var fs = require('fs');
var datab = require('./init_database');

function upload (req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
		if (files.file) {
			var oldpath = files.file.path;
			var newpath = './images/' + files.file.name;
			fs.rename(oldpath, newpath, function (err) {
				if (err) throw err;
                datab.upload(files.file.name, req.session.pseudo, 0);
                console.log('test');
			});
			console.log(files.file.path);
		}
	});
}

exports.main_page = function(req, res) {

	upload(req, res);
    list_file = datab.get_list_file(function(err, rows, fields){
        console.log(rows);
    });
	app.render('ressources/header.ejs', {pseudo: "test"}, function(err, html){
		//console.log(html);
		//console.log(err);
		header = html;
		app.render('ressources/upload.ejs', {pseudo: "test"}, function(err, html){
			//console.log(html);
			//console.log(err);
			res.end(header + html);
		});
	});
}
