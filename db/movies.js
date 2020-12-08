const mongoose = require('./mongodb-connect')

let movieSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    horario: {
        type: String,
        required: true
    },
    año: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    sinopsis: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

movieSchema.statics.addMovie = function(movie) {
    console.log(movie);
    let newMovie = Movie(movie);
    return newMovie.save();
}

let Movie = mongoose.model('movies', movieSchema);

// let nuevoUsuario = {
//     "nombre": "Bastardos",
//   "horario": "7:00",
//   "año": "2012",
//   "director": "Tarantino",
//    "sinopsis": "Cfefhe",
//     "url"
// }
/*
async function crearPelicula(mov) {
    let doc = await mov.save()
    if (doc) console.log(doc);
}

//crearUsuario(usuario)

function getMovie() {
    Movie.find({
        
    }, (err, docs) => {

        if (docs) {
            return docs
        }
        return
    })
}
*/
module.exports = Movie;