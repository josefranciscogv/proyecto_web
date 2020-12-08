const express = require('express');
const router = express.Router();
//const fs = require('fs');
const Products = require('../db/products');

router.route('/')
    .get((req, res) => {
        res.sendFile('Productos.html', { root: __dirname })
        Products.find()
            .then(products => {
                res.statusCode = 200;
                res.send(products);
            })
            .catch(reason => {
                res.statusCode = 500;
                res.end();
            });
    })
    .post(async function (req, res) {
        let newProduct = req.body;

        // Validar si vienen las propiedades
        if(!newProduct.producto || !newProduct.precio || !newProduct.descripcion
             || !newProduct.num_existentes) {
            res.statusCode = 400;
            res.send('Las propiedades requeridas son: nombre del producto'
                        + ', precio, descripcion, num_existentes');
        }
        else {
            // Validar si existe producto con el mismo nombre
            let sameNameProduct = await Products.find({producto: newProduct.producto});

            if(sameNameProduct.length > 0) {
                res.statusCode = 400;
                res.send('Ya existe un producto con el mismo nombre');
            }
            else {
                let productDocument = Products(newProduct);
                productDocument.save()
                    .then(producto => {
                        res.statusCode = 201;
                        res.send(producto);
                    })
                    .catch(reason => {
                        res.statusCode = 500;
                        res.end();
                    });       
            }
        }
    });
    

    module.exports = router;