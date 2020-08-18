var express = require('express');

var app = new express();

var Hospital = require('../models/hospital');
var Medicos = require('../models/medico');
var Usuarios = require('../models/usuario');

// BUSQUEDA POR COLECCION
app.get('/coleccion/:tabla/:busqueda', (req, res)=>{
    var tabla = req.params.tabla;
    var busqueda = req.params.busqueda;
    var regx = new RegExp(busqueda, 'i');
    var promesa;
    switch(tabla){
        case 'usuarios':
            promesa =  buscarUsuarios(busqueda,regx);
        break;
        case 'hospitales':
            promesa =  buscarHospitales(busqueda,regx);
        break;
        case 'medicos':
            promesa =  buscarMedicos(busqueda,regx);
        break;
        default:
            return res.status(400).json({
                ok:false,
                mensaje:'Error con tipo de busqueda'
            });
    }
    promesa.then(data=>{
        res.status(200).json({
            ok:true,
            [tabla]:data
        });
    });
})

// BUSQUEDA GENERAL
app.get('/todo/:busqueda', (req, res)=>{

    var busqueda = req.params.busqueda;
    var regx = new RegExp(busqueda, 'i');
    // Ejecutar un arreglo de promesas en paralelo
    Promise.all([buscarHospitales(busqueda,regx), 
                buscarMedicos(busqueda,regx),
                buscarUsuarios(busqueda,regx)]).then(respuestas=>{
        res.status(200).json({
            ok:true,
            hospitales: respuestas[0],
            medicos:respuestas[1],
            usuarios:respuestas[2]
        });
    });
});

function buscarHospitales(busqueda, regx){
    return new Promise((resolve, reject)=>{
        Hospital.find({nombre: regx})
        .populate('usuario', 'nombre email img')
        .exec((err,hospitales)=>{
            if(err){
                reject('error al cargar hospitales, error: ',err)
            }else{
                resolve(hospitales);
            }
        });
    });  
}

function buscarMedicos(busqueda, regx){
    return new Promise((resolve, reject)=>{
        Medicos.find({nombre: regx})
        .populate('usuario', 'nombre email img')
        .populate('hospital')
        .exec((err,medicos)=>{
            if(err){
                reject('error al cargar hospitales, error: ',err)
            }else{
                resolve(medicos);
            }
        });
    });  
}

function buscarUsuarios(busqueda, regx){
    return new Promise((resolve, reject)=>{
        Usuarios.find({}, 'nombre email role img')
        .or([{'nombre':regx},{'email':regx}])
        .exec((err,usuarios)=>{
            if(err){
                reject('error al cargar hospitales, error: ',err)
            }else{
                resolve(usuarios);
            }
        });
    });  
}

module.exports = app;