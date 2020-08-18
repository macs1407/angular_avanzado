var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;


// google
var CLIENT_ID = require('../config/config').CLIENT_ID;
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);
var mdAutenticacion = require('../middleware/autenticacion');

var app = express();

var Usuario = require('../models/usuario');

app.post('/', (req, res) => {
    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDb) => {
        // Si encuentra un error 
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error ingresando!!!',
                errors: err
            });
        }

        if (!usuarioDb) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrecta!!!',
                errors: err
            });
        }
        // Comprobar contraseña
        if (!bcrypt.compareSync(body.password, usuarioDb.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrecta, password!!!',
                errors: err
            });
        }
        // Crear un token
        var token = jwt.sign({ usuario: usuarioDb }, SEED, { expiresIn: 14400 }); // 4 horas

        res.status(200).json({
            ok: true,
            usuario: usuarioDb,
            token: token,
            id: usuarioDb.id,
            menu: obtenerMenu(usuarioDb.role)
        });
    });

});
// AUTENTICACION GOOGLE
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    //const userid = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
  }

// Renueva token
app.get('/renuavatoken',mdAutenticacion.verificaToken, (req, res)=>{
    var token = jwt.sign({ usuario: req.usuario }, SEED, { expiresIn: 14400 }); // 4 horas

    res.status(403).json({
        ok: true,
        token: token
    });

});

app.post('/google', async (req, res, next) => {
    var token = req.body.token;
    var googleUser = await verify(token) // Esta funcion retorna una promesa
                            .catch(e=>{
                                return res.status(403).json({
                                    ok: true,
                                    mensaje: 'token no valido!!!'
                                });
                            });
    Usuario.findOne({email: googleUser.email}, (err, usuarioDb)=>{
        // Si encuentra un error 
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error ingresando!!!',
                errors: err
            });
        }

        if (usuarioDb) {
            if(usuarioDb.google === false){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Den logearse de menera normal!!!',
                    errors: err
                });
            } else {
                // Crear un token
                var token = jwt.sign({ usuario: usuarioDb }, SEED, { expiresIn: 14400 }); // 4 horas

                res.status(200).json({
                    ok: true,
                    usuario: usuarioDb,
                    token: token,
                    id: usuarioDb.id,
                    menu: obtenerMenu(usuarioDb.role)
                });
            } 
        // El usuario no existe hay que crealo           
        } else {
            var usuario = new Usuario();
            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email
            usuario.img = googleUser.img;
            usuario.password = ':)';
            usuario.google = true;

            usuario.save((err, usuarioGuardado)=>{
                // Si encuentra un error 
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error guardando nuevo usuario!!!',
                        errors: err
                    });
                }
                 // Crear un token
                 var token = jwt.sign({ usuario: usuarioDb }, SEED, { expiresIn: 14400 }); // 4 horas
                res.status(200).json({
                    ok:true,
                    usuario: usuarioGuardado,
                    token: token,
                    id: usuarioGuardado._id,
                    menu: obtenerMenu(usuarioGuardado.role)
                });
            });
        }
    });


    /* res.status(200).json({
        ok: true,
        mensaje: 'peticion realizada con exito google!!!',
        googleUser: googleUser
    }); */
});

function obtenerMenu(role){
    var menu = [
        {
          titulo:'Principal',
          icono:'mdi mdi-gauge',
          submenu: [
            {titulo: 'Dashboard',url:'/dashboard'},
            {titulo: 'Progress',url:'/progress'},
            {titulo: 'Graficas',url:'/graficas1'},
            {titulo: 'Promesas',url:'/promesas'},
            {titulo: 'Rxjs',url:'/rxjs'}
          ]
        },
        {
          titulo: 'Mentenimiento',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            //{titulo: 'Usuarios', url:'/usuarios'},
            {titulo: 'Hospitales', url:'/hospitales'},
            {titulo: 'Medicos', url:'/medicos'}
          ]
        }
      ];
    console.log('role',role);
    if(role === 'ADMIN_ROLE'){
        // El push lo pone al final y el unshift lo pone al principio
        menu[1].submenu.unshift({titulo: 'Usuarios', url:'/usuarios'});
    }
    return menu;
}

module.exports = app;