const express = require('express');
const randomize = require('randomatic');
const port = process.env.PORT || 3000;
const app = express();
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const peliculasRouter = require('./routes/Peliculas');
const homeRouter = require('./routes/index');
const jwt = require('jsonwebtoken');
const Users = require('./db/users');
const bcrypt = require('bcrypt');
var cors = require('cors');
app.use(cors());

app.use('/home', express.static(__dirname + '/FrontEnd/index.html'));
app.use('/api/users', express.static(__dirname + '/FrontEnd/consulta.html'));
app.use('/api/products', express.static(__dirname + '/FrontEnd/Productos.html'));
app.use('/api/Peliculas', express.static(__dirname + '/FrontEnd/Peliculas.html'));


let corsConfig = {
    origin: "*"
}
app.use(cors(corsConfig));
app.use(express.json());



app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/Peliculas', peliculasRouter);
app.use('/home', homeRouter);
//authMiddleware

app.post('/api/login', async function (req, res) {
    // Programar aquí lógica de token
    Users.findOne({correo: req.body.correo}, (err, data) => {
        if(err) {
            res.statusCode = 400;
            res.end();
        }
        else {
            if(bcrypt.compareSync(req.body.password, data.password)) {
                let token = jwt.sign({nombre: data.nombre, id: data._id}, 'secret');
                res.statusCode = 200;
                res.end(token);
            }
            else {
                res.statusCode = 400;
                res.end();
            }            
        }
    })
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

async function authMiddleware(req, res, next) {
    if(!req.headers['x-auth-user']) {
        res.statusCode = 401;
        res.end();
    }
    else {
        // Validar que el token sea válido
        let token = req.headers['x-auth-user'];
        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                res.statusCode = 401;
                res.end();
            }
            else {
                req.nombre = decoded.nombre;
                req.id = decoded.id;
                next();
            }
        });        
    }
}