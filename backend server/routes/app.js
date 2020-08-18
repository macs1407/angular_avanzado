var express = require('express');

var app = express();

// Rutas
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'peticion realizada con exito!!!'
    });
});

// exportarlo para que se pueda utilizar en otros lados
module.exports = app;