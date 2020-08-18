var express = require('express');
var mdAutenticacion = require('../middleware/autenticacion');

var app = new express();

var Medico = require('../models/medico');

// OBTENER LOS MEDICOS
app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Medico.find({})
        .skip(desde) // Por ejemplo si se envia 10, saltara esos 10 y ejecutara los siguientes 5 del limit
        .limit(5) // limitar el numero de paginas
        .populate('usuario', 'nombre email') // Especificar la coleccion y los campos a sacar
        .populate('hospital', 'nombre')
        .exec((err, medicos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'ha ocurrido un error mientras se buscaban los medicos',
                    erros: err
                });
            }
            Medico.count({},(err, conteo)=>{
                res.status(200).json({
                    ok: true,
                    medicos: medicos,
                    total: conteo
                });
            });            
        });
});

// OBTENER MEDICOS POR ID
app.get('/:id', (req, res) => {
    var id = req.params.id;
    Medico.findById(id)
    .populate('usuario','nombre email img')
    .populate('hospital')
    .exec((err, medico) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se encontro medico por el id ' + id,
                erros: err
            });
        }
        if (!medico) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No se encontro medico por el id ' + id,
                erros: err
            });
        }
        res.status(200).json({
            ok: true,
            medico: medico
        });
    });
});

// GUARDAR UN MEDICO
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var medico = new Medico({
        nombre: body.nombre,
        usuario: req.usuario._id,
        hospital: body.hospital
    });

    medico.save((err, medicoGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear medico',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            medico: medicoGuardado
        });


    });

});

// ACTUALIZAR
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    Medico.findById(id, (err, medico) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "ha ocurrido un error mientras se actualizada",
                erros: err
            });
        }

        if (!medico) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El medico con el id ' + id + ', no existe',
                errors: { message: 'no existe un medico con ese id' }
            });
        }

        var body = req.body;
        medico.nombre = body.nombre;
        medico.usuario = req.usuario._id;
        medico.hospital = body.hospital;

        medico.save((err, medicoGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar medico',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                medico: medicoGuardado
            });

        });

    })
});

// BORRAR
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Medico.findById(id, (err, medico) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'ha ocurrido un error mientras se intentaba eliminar el medico por el id: ' + id,
                errors: err
            });
        }
        if (!medico) {
            return res.status(400).json({
                ok: false,
                mensaje: 'ha ocurrido un error mientras se intentaba eliminar el medico por el id: ' + id,
                errors: err
            });
        }

        Medico.findByIdAndRemove(id, (err, medicoEliminado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'ha ocurrido un error mientras se intentaba eliminar el medico por el id: ' + id,
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                hospital: medicoEliminado
            });
        });
    });
});


// exportarlo para que se pueda utilizar en otros lados
module.exports = app;