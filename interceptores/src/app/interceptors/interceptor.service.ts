import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {_throw as throwError} from 'rxjs/observable/throw'; 
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class InterceptorService implements HttpInterceptor{
  
  constructor() { }
  
  intercept(req, next) {
    const headers = new HttpHeaders({
      'token-usuarios':'ajjjjjssss'
    });
    // Clonar la peticion antes de que sea usada "manipulada"
    const reqClone = req.clone({
      headers
    });

    console.log('paso por el interceptor');
    return next.handle(reqClone).pipe(
      catchError(this.manejarError)
    );
  }

  manejarError(error: HttpErrorResponse){
    console.warn(error);
    return throwError(error);
  }
}
