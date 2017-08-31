var mysql = require('mysql');



const data_name = "table1";
const table_name = "camagru";
const table_img = "list_images";
const img_rep = "./images/";

var con;

var connect = function (host, user, password) {
	var db = mysql.createConnection({
		host: host,
		user: user,
		password: password,
		database: data_name
	});

	db.connect(function(err) {
		if (err) throw err;
		con = db;
		console.log("Connected!");
		return db;
	});
}

var logValid = function(pseudo, password, callback){
	con.query("SELECT pseudo FROM " + table_name + " WHERE pseudo = '" + pseudo + "' AND password = MD5('" + password + "');", function(err, rows, fields) {
		if (err)
		{
			console.log(err);
		}
		else {
			for (elem of rows) {
				if (elem.pseudo) {
					callback(true);
				}
				else
				{
					callback(false);
				}
				console.log(rows);
			}
		}

	});
}


var inscription = function(pseudo, password, email, callback){

	request = "SELECT pseudo FROM " + table_name + " WHERE pseudo = \'" + pseudo + "' OR email = '" + email + "';";
	con.query(request, function (err, rows, fields) {
		if (err){
			callback(false, "Erreur sql");
			console.log(err);
			return;
		}
		for (elem of rows) {
			callback(false, "Utilisateur ou email existant");
			return;
		}
		request = "INSERT INTO " + table_name + " (pseudo, password, email, date) VALUES ('" + pseudo + "', MD5('" + password + "'), '" + email + "', NOW());"
			con.query(request, function (err, rows, fields) {
				if (err) { console.log(err);}
				callback(true, "Inscription reussie");
			});
	});
}

var get_list_file = function(callback){
    request = "SELECT * FROM " + table_img + ";";
    con.query(request, function(err, rows, fields) {
        callback(err, rows, fields);
    });
}

var upload = function(file_name, author, likes) {
    file_name = img_rep + file_name;
	request = "INSERT INTO " + table_img + " (name, author, aime, date) VALUES ('" + file_name + "', '" + author + "', 0, NOW());";
    con.query(request, function(err, rows, fields) {
        if (err) {console.log(err);}
        console.log("fichier ajoute");
    });

}
exports.get_list_file = get_list_file;
exports.upload = upload;
exports.inscription = inscription;
exports.logValid = logValid;
exports.connect_database = connect;

function init_database() {



}
