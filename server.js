// set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express                  // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    app.use('/public',express.static(__dirname + '/public'));
    app.use('/bower_components',  express.static(__dirname + '/bower_components'));
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());


    app.get('*', function(req, res) {
       res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
   });

    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");
