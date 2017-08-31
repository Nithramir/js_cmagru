var qs = require('querystring');
var session = require('express-session');

var get_post = function (request, callback) {
	var body = '';

	request.on('data', function (data) {
		body += data;

		// Too much POST data, kill the connection!
		// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
		if (body.length > 1e6)
			request.connection.destroy();
	});

	request.on('end', function () {
		var post = qs.parse(body);
		callback(post);
		// use post['blah'], etc.
	});
}

exports.get_post = get_post;

exports.test = function(req, res) {
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
							connection_success(req, res);
						}
						else {
							connection(req, res);
						}
					});
				}
				else {
					connection(req, res);
				}
			});
		}
}
