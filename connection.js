exports.connection = function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    //res.render('header.ejs', {pseudo: "test"});

    app.render('ressources/header.ejs', {pseudo: "test"}, function(err, html){
        console.log(html);
        console.log(err);
        header = html;
        app.render('ressources/connection.ejs', {pseudo: "test"}, function(err, html){
            console.log(html);
            console.log(err);
            body = html;
            res.end(header + body);
        });
    });
}

exports.connection_success = function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    //res.render('header.ejs', {pseudo: "test"});

    app.render('ressources/header.ejs', {pseudo: req.session.pseudo}, function(err, html){
        console.log(html);
        console.log(err);
        header = html;
        app.render('ressources/connection_successfull.ejs', {pseudo: req.session.pseudo}, function(err, html){
            console.log(html);
            console.log(err);
            body = html;
            res.end(header + body);
        });
    });
}
