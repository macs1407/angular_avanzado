var express = require('express');
var fs = require('fs');
const fileUpload = require('express-fileupload');

var app = new express();

// default options
app.use(fileUpload());
var Usuario = require('../models/usuario');
var Hospital = require('../models/hospital');
var Medico = require('../models/medico');

app.put('/:tipo/:id', (req, res)=>{
    var tipo = req.params.tipo;
    var id = req.params.id;
    var tiposDeColeccion = ['hospitales','medicos','usuarios'];
    if(tiposDeColeccion.indexOf(tipo)<0){
        return res.status(500).json({
            ok: false,
            mensaje: 'Tipo de coleccion no es valida!!!',
        });
    }

    // Preguntar si bienen archivos
    if(!req.files){
        return res.status(500).json({
            ok: false,
            mensaje: 'Debe seleccionar un archivo!!!',
        });
    }

    // Validar que sea una imagen
    var archivo = req.files.imagen;
    var cortar = archivo.name.split('.');
    var extension = cortar[cortar.length-1];

    var extensionPermitidas = ['jpg','png','gif','jgep'];
    if(extensionPermitidas.indexOf(extension)<0){
        return res.status(500).json({
            ok: false,
            mensaje: 'La extensiones validas son '+extensionPermitidas.join(', '),
        });
    }

    // Nombre archiv personalizado
    var nombreArchivo = id+'-'+new Date().getMilliseconds()+'.'+extension;
    // Mover el archivo a un path
    var path = `./uploads/${tipo}/${nombreArchivo}`;
    archivo.mv(path,err=>{
        if(err){
            return res.status(500).json({
                ok:false,
                mensaje:'error al mover el archivo',
                errors:err
            });
        }
        subirPorTipo(tipo,id,nombreArchivo,res);
        // Actualizar registro de la base de datos
        
    })
   
});

function subirPorTipo(coleccion, id, nombreArchivo, res){
    // Usuarios
    if(coleccion === 'usuarios'){
        Usuario.findById(id, (err,usuario)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    mensaje:'Se ha presentado un error al consultar el usuario por el id '+id,
                    errors:err
                });
            }
    
            if(usuario.img != null && usuario.img != ''){
                var pathViejo = './uploads/usuarios/'+usuario.img;
                // Si existe una imagen vieja
                if(fs.existsSync(pathViejo)){
                    fs.unlinkSync(pathViejo); // borrar el archivo anterior
                }
            }
            
            // Actualizar el archivo
            usuario.img = nombreArchivo;
            usuario.save((err, usuarioActualizado)=>{
                if(err){
                    return res.status(500).json({
                        ok:false,
                        mensaje:'error al actualizar '+coleccion,
                        errors:err
                    });
                }
                usuarioActualizado.password = '';
                return res.status(200).json({
                    ok: false,
                    mensaje: 'imagen de usuario actualizada!!!',
                    usuarioActualizado:usuarioActualizado
                });
            });
        });
    }
    // Medicos
    if(coleccion === 'medicos'){
        Medico.findById(id, (err,medico)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    mensaje:'Se ha presentado un error al consultar el medico por el id '+id,
                    errors:err
                });
            }
    
            if(medico.img != null && medico.img != ''){
                var pathViejo = './uploads/medicos/'+medico.img;
                // Si existe una imagen vieja
                if(fs.existsSync(pathViejo)){
                    fs.unlinkSync(pathViejo); // borrar el archivo anterior
                }
            }
            
            // Actualizar el archivo
            medico.img = nombreArchivo;
            medico.save((err, medicoActualizado)=>{
                if(err){
                    return res.status(500).json({
                        ok:false,
                        mensaje:'error al actualizar '+coleccion,
                        errors:err
                    });
                }
                return res.status(200).json({
                    ok: false,
                    mensaje: 'imagen de medico actualizada!!!',
                    medicoActualizado:medicoActualizado
                });
            });
        });
    }
    // Hospitales
    if(coleccion === 'hospitales'){
        Hospital.findById(id, (err,hospital)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    mensaje:'Se ha presentado un error al consultar el hospital por el id '+id,
                    errors:err
                });
            }
    
            if(hospital.img != null && hospital.img != ''){
                var pathViejo = './uploads/hospitales/'+hospital.img;
                // Si existe una imagen vieja
                if(fs.existsSync(pathViejo)){
                    fs.unlinkSync(pathViejo); // borrar el archivo anterior
                }
            }
            
            // Actualizar el archivo
            hospital.img = nombreArchivo;
            hospital.save((err, hospitalActualizado)=>{
                if(err){
                    return res.status(500).json({
                        ok:false,
                        mensaje:'error al actualizar '+coleccion,
                        errors:err
                    });
                }
                return res.status(200).json({
                    ok: false,
                    mensaje: 'imagen de hospital actualizada!!!',
                    hospitalActualizado:hospitalActualizado
                });
            });
        });
    }
}

module.exports = app;