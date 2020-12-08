const mongoose = require('./mongodb-connect')

let productsSchema = mongoose.Schema({
    producto: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    num_existentes: {
        type: Number
    }
});

productsSchema.statics.addProduct = function(product) {
    console.log(product);
    let newProduct = Products(product);
    return newProduct.save();
}

let Products = mongoose.model('products', productsSchema);

module.exports = Products;