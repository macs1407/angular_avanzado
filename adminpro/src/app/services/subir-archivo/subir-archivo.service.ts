import { Injectable } from '@angular/core';
import { resolve } from 'url';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  /**
   * Subir alquier archivo
   * @param archivo 
   * @param tipo 
   * @param id 
   */
  subirArchivo(archivo:File, tipo:string, id:string){
    return new Promise((resolve,reject)=>{
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append('imagen',archivo,archivo.name);
      xhr.onreadystatechange = function(){
        // Me interesa cuando termine el proceso
        if(xhr.readyState === 4){
          // Si lo hizo correctamente
          if(xhr.status === 200){
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      // Url donde se va hacer la peticion
      let urlPeticion = URL_SERVICIOS+'/upload/'+tipo+'/'+id;
      xhr.open('put',urlPeticion,true);
      xhr.send(formData);
    });
    
  }
}
