const express = require('express');
const router = express.Router();
const Users = require('../db/users');
const bcrypt = require('bcrypt');

router.route('/')
    .get((req, res) => {
        
        Users.find()
            .then(users => {
                res.statusCode = 200;
                res.send(users);
            })
            .catch(reason => {
                res.statusCode = 500;
                res.end();
            });
            res.sendFile('consulta.html', { root: __dirname })
    })
    /*
    .post(async function (req, res) {
        let newUser = req.body;

        // Validar si vienen las propiedades
        if(!newUser.nombre || !newUser.apellido || !newUser.correo || !newUser.sexo || !newUser.fecha || !newUser.password) {
            res.statusCode = 400;
            res.send('Las propiedades requeridas son: nombre, apellido, correo, sexo, fecha y password');
        }
        else {
            // Validar si existe un usuario con el mismo correo o nombres y apellidos
            let sameEmailUser = await Users.find({correo: newUser.correo});
            let sameNameUser = await Users.find({nombre: newUser.nombre, apellido: newUser.apellido});

            if(sameEmailUser.length > 0) {
                res.statusCode = 400;
                res.send('Ya existe un usuario con el mismo correo');
            }
            else if(sameNameUser.length > 0) {
                res.statusCode = 400;
                res.send('Ya existe un usuario con el mismo nombre');
            }
            else {
                // Encriptar contraseña
                newUser.password = bcrypt.hashSync(newUser.password, 10);

                let userDocument = Users(newUser);
                userDocument.save()
                    .then(user => {
                        res.statusCode = 201;
                        res.send(user);
                    })
                    .catch(reason => {
                        res.statusCode = 500;
                        res.end();
                    });       
            }
        }
    });
    */

module.exports = router;


