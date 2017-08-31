var datab = require('./init_database.js');
var post = require('./tools');



exports.inscription = function (req, res) {
    data = post.get_post(req, function(data) {
        if (data.email && data.pseudo && data.password){
            datab.inscription(data.pseudo, data.password, data.email, function (bool, msg) {
                res.end(msg);
            });
        }
        else
        {
            app.render('ressources/header.ejs', {pseudo: "test"}, function(err, html){
                console.log(html);
                console.log(err);
                header = html;
                app.render('ressources/inscription.ejs', {pseudo: "test"}, function(err, html){
                    console.log(html);
                    console.log(err);
                    res.end(header + html);

                });


            });

        }
    });
}
