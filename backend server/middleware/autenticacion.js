var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

exports.verificaToken = function(req, res, next) {

    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {
        // Si encuentra un error 
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto!!!',
                errors: err
            });
        }

        req.usuario = decoded.usuario;

        // cuando se llama al next se le indica que puede continuar con las funciones que siguen abajo
        next();
    });
}

// VERIFICAR SI QUE ES UN ADMIN
exports.verificaAdmin = function(req, res, next) {

    var usuario = req.usuario;
    console.log('usuario',usuario);
    // Si el rol es administrador
    if(usuario.role === 'ADMIN_ROLE'){
        // Si es valido se ejecutan los demas proceso con next()
        next();
        return;
    }
    return res.status(401).json({
        ok: false,
        mensaje: 'Permisos incorrectos no es administrador!!!'
    });
}

// VERIFICAR SI QUE ES UN ADMIN O MISMO USUARIO
exports.verificaAdminoMismoUsuario = function(req, res, next) {

    var usuario = req.usuario;
    var id = req.params.id;

    console.log('usuario',usuario);
    // Si el rol es administrador o es el mismo usuario que se quiere actualizar
    // lo permite
    if(usuario.role === 'ADMIN_ROLE' || usuario._id === id){
        // Si es valido se ejecutan los demas proceso con next()
        next();
        return;
    }
    return res.status(401).json({
        ok: false,
        mensaje: 'Permisos incorrectos no es administrador, ni es el mismo usuario!!!'
    });
}