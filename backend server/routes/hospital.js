var express = require('express');
var mdAutenticacion = require('../middleware/autenticacion');

var app = express();

var Hospital = require('../models/hospital');

// GET
app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Hospital.find({})
        .skip(desde) // Por ejemplo si se envia 10, saltara esos 10 y ejecutara los siguientes 5 del limit
        .limit(5) // limitar el numero de paginas
        .populate('usuario', 'nombre email') // Especificar los campos de la otra coleccion
        .exec((err, hospitales) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando hospitales!!!',
                    errors: err
                });
            }
            Hospital.count({},(err, conteo)=>{
                res.status(200).json({
                    ok: true,
                    hospitales: hospitales,
                    total: conteo
                });
            }); 
        });
});

// GET POR ID
app.get('/:id', (req, res) => {
    var id = req.params.id;
    // Comprobar si un hospital tiene ese id
    Hospital.findById(id)
        .populate('usuario', 'nombre email') // Especificar la coleccion y los campos a sacar
        .exec((err, hospital) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'No se encontro hospotal por el id: ' + id,
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                hospital: hospital
            });
        });
})

// POST
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var hospital = new Hospital({
        nombre: body.nombre,
        usuario: req.usuario._id
    });

    hospital.save((err, hospitalGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error guardando hospitales!!!',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            hospitales: hospitalGuardado
        });
    });
});

// ACTUALIZAR USUARIO
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    // Comprobar su un usuario tiene ese id
    Hospital.findById(id, (err, hospital) => {
        // Si encuentra un error 
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'El id no existe!!!',
                errors: err
            });
        }

        if (!hospital) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El hospital con el id ' + id + ', no existe',
                errors: { message: 'no existe un usuario con ese id' }
            });
        }

        var body = req.body;
        hospital.nombre = body.nombre,
        hospital.usuario = req.usuario_id,

            hospital.save((err, hospitalActualizado) => {
                // Si encuentra un error 
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al crea hospital!!!',
                        errors: err
                    });
                }

                res.status(201).json({
                    ok: true,
                    hospital: hospitalActualizado
                });
            });
    });
});

// BORRAR UN HOSPITAL
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    // Comprobar su un usuario tiene ese id
    Hospital.findById(id, (err, hospital) => {
        // Si encuentra un error 
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'El id no existe!!!',
                errors: err
            });
        }

        if (!hospital) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El hospital con el id ' + id + ', no existe',
                errors: { message: 'no existe un hospital con ese id' }
            });
        }

        Hospital.findByIdAndRemove(id, (err, hospitalEliminado) => {
            // Si encuentra un error 
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'El id no existe!!!',
                    errors: err
                });
            }
            // Si encuentra un error 
            if (!hospitalEliminado) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'No existe un hospital con ese id!!!',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                mensaje: hospitalEliminado
            });
        });

    });
});
// exportarlo para que se pueda utilizar en otros lados
module.exports = app;