var express = require('express');
const path = require('path');
var fs = require('fs');
var app = express();

// Rutas
app.get('/:tipo/:img', (req, res, next) => {
    var tipo = req.params.tipo;
    var img = req.params.img;
    var pathImagen = path.resolve(__dirname, `../uploads/${tipo}/${img}`);
    // Comprobar si existe la imagen
    if(fs.existsSync(pathImagen)){
        res.sendFile(pathImagen);
    } else {
        var pathNoImagen = path.resolve(__dirname, `../assets/no-img.jpg`);
        res.sendFile(pathNoImagen);
    }
});

// exportarlo para que se pueda utilizar en otros lados
module.exports = app;