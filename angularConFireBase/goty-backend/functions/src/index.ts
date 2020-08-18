import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://firestore-grafica-angular.firebaseio.com"
});
// Obtener referencia a la base de datos
const db = admin.firestore();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
    response.json({
        mensaje: "Hola mundo desde funciones de firebase."
    });
});

// async permite utilizar el comando await son propios de java script
export const getGoty = functions.https.onRequest(async(request, response) => {
    // Obtener un parametro por url
    //const nombre = request.query.nombre || 'sin nombre';

    // Referencia a la coleccion
    const gotyRef = db.collection('goty');
    // CON AWAIT LE DECIMOS QUE ESPERE A QUE REGRESE LA INFORMACION Y QUE LO PONGA EN DOCSSNAP
    const docsSnap = await gotyRef.get(); 
    
    response.status(400).json({
        docsSnap
    });
});
