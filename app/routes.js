// app/routes.js
var express = require('express');

// grab the user model we just created
var Doador = require('./models/doador');

module.exports = function(app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // API routes
    var router = express.Router(); 

    var saveDoador = function(doador,body,res) {
            var creation = (doador == null);
            if (creation) doador = new Doador();      // create a new instance of the Doador model
            doador.name = body.name;
            doador.phone = body.phone;
            doador.email = body.email;
            if (creation) doador.created_at = new Date().getTime();
            doador.updated_at = new Date().getTime();
            if (body.notas) {
                doador.notas = [];
                for (key in body.notas) {
                    doador.notas.push(body.notas[key]);
                }
            }

            doador.save(function(err,obj) {
                if (err)
                    res.send(err);
                console.log(obj);
                if (creation)
                    res.json({ message: 'Doador created!', _id: obj._id });
                else
                    res.json({ message: 'Doador updated!' });

            });

    }

    router.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    router.route('/doadores')
        .get(function(req, res) {

            // use mongoose to get all doadores in the database
            Doador.find(function(err, doadores) {

                // if there is an error retrieving, send the error. 
                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(doadores); // return all doadores in JSON format

            });
        })

        .post(function(req, res) {
            console.log('Creating new doador');
            saveDoador(null,req.body,res);

        });

    router.route('/doadores/:doador_id')

        .get(function(req, res) {
            Doador.findById(req.params.doador_id, function(err, doador) {
                if (err)
                    res.send(err);
                res.json(doador);
            });
        })

        .put(function(req, res) {
            console.log('Updating doador ' + req.params.doador_id);
            // use our doador model to find the doador we want
            Doador.findById(req.params.doador_id, function(err, doador) {

                if (err)
                    res.send(err);

                saveDoador(doador,req.body,res);

            });
        });

    app.use('/api', router);

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load our public/index.html file
    });

};
