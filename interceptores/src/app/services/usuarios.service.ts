import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators/catchError';
import {_throw as throwError} from 'rxjs/observable/throw'; 

@Injectable()
export class UsuariosService {

  constructor(private http : HttpClient) { }

  obtenerUsuarios(){
    let params = new HttpParams().append('page','1');
    params = params.append('nombre','maikol');

    return this.http.get('https://reqres.in/api/users',{params:params})
    .pipe(
      // Retornar solo los datos que necesitamos y se encuentra en data
      map((resp:any)=>{
        return resp['data'];
      // Captura los errores y retorna un observable
      }),catchError(error=>{
        console.log('Error en la peticion');
        return throwError(error);
      })      
    );
  }

}
