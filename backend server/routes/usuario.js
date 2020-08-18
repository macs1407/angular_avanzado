var express = require('express');
var bcrypt = require('bcryptjs');
var mdAutenticacion = require('../middleware/autenticacion');

var app = express();

var Usuario = require('../models/usuario');

// OBTENER TODOS LOS USUARIOS
app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Usuario.find({}, 'nombre email img role google')
        .skip(desde) // Por ejemplo si se envia 10, saltara esos 10 y ejecutara los siguientes 5 del limit
        .limit(5) // limitar el numero de paginas
        .exec((err, usuarios) => {
        // Si encuentra un error 
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando usuarios!!!',
                errors: err
            });
        }
        Usuario.count({},(err,conteo)=>{
              // Si no se encutra error
            res.status(200).json({
                ok: false,
                usuarios: usuarios,
                total: conteo
            });
        })
      
    });

    /*Usuario.find({}, 'nombre email img role',(err, usuarios) => {
        // Si encuentra un error 
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando usuarios!!!',
                errors: err
            });
        }
        // Si no se encutra error
        res.status(200).json({
            ok: false,
            usuarios: usuarios
        });
    });*/
});

// OBTENER UN USUARIO POR SU ID
app.get('/:id', (req, res) => {
    var id = req.params.id;
    // Comprobar su un usuario tiene ese id
    Usuario.findById(id, (err, usuario) => {
        // Si encuentra un error 
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al obtener usuario!!!',
                errors: err
            });
        }
        // Si no se encutra error
        res.status(200).json({
            ok: true,
            usuarios: usuario
        });
    });
});

// ACTUALIZAR TODOS LOS USUARIOS
app.post('/', (req, res) => {
    var salt = bcrypt.genSaltSync(10);
    var body = req.body;
    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        role: body.role,
        img: body.img,
        password: bcrypt.hashSync(body.password, salt)
    });

    usuario.save((err, usuarioGuarado) => {
        // Si encuentra un error 
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crea usuario!!!',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuarios: usuarioGuarado
        });
    });
});

// ACTUALIZAR USUARIO
app.put('/:id',[mdAutenticacion.verificaToken,mdAutenticacion.verificaAdminoMismoUsuario], (req, res) => {
    var id = req.params.id;
    // Comprobar su un usuario tiene ese id
    Usuario.findById(id, (err, usuario) => {
        // Si encuentra un error 
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'El id no existe!!!',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ', no existe',
                errors: { message: 'no existe un usuario con ese id' }
            });
        }

        var body = req.body;
        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.img = body.img;
        usuario.role = body.role;

            usuario.save((err, usuarioGuardado) => {
                // Si encuentra un error 
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar el usuario!!!',
                        errors: err
                    });
                }

                res.status(201).json({
                    ok: true,
                    usuarios: usuarioGuardado
                });
            });
    });
});

// Borrar usuario por id
app.delete('/:id', [mdAutenticacion.verificaToken,mdAutenticacion.verificaAdmin], (req, res) => {
    var id = req.params.id;

    // Comprobar su un usuario tiene ese id
    Usuario.findById(id, (err, usuario) => {
        // Si encuentra un error 
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'El id no existe!!!'
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ', no existe',
                errors: { message: 'no existe un usuario con ese id' }
            });
        }

        Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
            // Si encuentra un error 
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al borrar usuario!!!',
                    errors: err
                });
            }

            // Si encuentra un error 
            if (!usuarioBorrado) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'No existe un usuario con ese id!!!',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                mensaje: usuarioBorrado
            });
        });
    });
});

// exportarlo para que se pueda utilizar en otros lados
module.exports = app;