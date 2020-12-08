const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Movie = require('../db/movies');

router.route('/')
    .get((req, res) => {
        res.sendFile('Peliculas.html', { root: __dirname })
        Movie.find()
            .then(users => {
                res.statusCode = 200;
                res.send(users);
            })
            .catch(reason => {
                res.statusCode = 500;
                res.end();
            });
    })

    .post(async function (req, res) {
        let newMovie = req.body;

        // Validar si vienen las propiedades
        if(!newMovie.nombre || !newMovie.horario || !newMovie.año || !newMovie.director || !newMovie.sinopsis
             || !newMovie.url) {
            res.statusCode = 400;
            res.send('Las propiedades requeridas son: nombre, horario, año, director, sinopsis');
        }
        else {
            // Validar si existe una pelicula con el mismo nombre
            let sameMovie = await Movie.find({nombre: newMovie.nombre});
            //let sameNameUser = await Users.find({nombre: newUser.nombre, apellido: newUser.apellido});

            if(sameMovie.length > 0) {
                res.statusCode = 400;
                res.send('Ya existe una pelicula con el mismo nombre');
            }
            else {
                let movieDocument = Movie(newMovie);
                movieDocument.save()
                    .then(movie => {
                        res.statusCode = 201;
                        res.send(movie);
                    })
                    .catch(reason => {
                        res.statusCode = 500;
                        res.end();
                    });       
            }
        }
    });

module.exports = router;