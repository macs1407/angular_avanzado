import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http'
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario : Usuario;
  token : string;
  menu : any[];

  constructor(public http: HttpClient
              ,public router : Router
              ,public subirArchivoService : SubirArchivoService) {
    this.cargarStorage();
  }

  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = null;
    }
  }
  
  guardarEstorage(id:string,token:string,usuario:Usuario,menu:any){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario',JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  estaLogueado(){
    return (this.token.length>5) ? true : false;
  }

  crearUsuario(usuario: Usuario):Observable<any>{
    return this.http.post(URL_SERVICIOS+'/usuario',usuario)
    .pipe(
      map((resp:any)=>{
        Swal.fire('Usuario creado, ',usuario.email);
        return resp.usuario;
      }),catchError(error=>{
        return throwError(error);
      })
    );  
  }

  actualizarUsuario(usuario:Usuario){
    let url = URL_SERVICIOS+'/usuario/'+usuario._id;
    url+='?token='+this.token;
    console.log(url);
    return this.http.put(url,usuario)
    .pipe(
      map((resp:any)=>{ 
        if(usuario._id === this.usuario._id){
          let usuarioDb : Usuario = resp.usuarios;
          this.guardarEstorage(JSON.stringify(usuarioDb._id),this.token, usuarioDb, this.menu);
        }
        Swal.fire('Usuario Actualizado',usuario.nombre);
        return true;
      }),catchError(error=>{
        return throwError(error);
      })
    );
  }

  login(usuario: Usuario, recordar : boolean = false){
    if(recordar){
      localStorage.setItem('email',usuario.email);
    } else {
      localStorage.removeItem('item');
    }
    return this.http.post(URL_SERVICIOS+"/login", usuario).pipe(
      map((resp:any)=>{
        this.guardarEstorage(resp.id,resp.token,resp.usuario,resp.menu);
        return true;
      }),catchError(error=>{
        console.log(error.status);
        return throwError(error);
      })
    );
  }

  loginGoogle(token: String){
    return this.http.post(URL_SERVICIOS+"/login/google", {token}).pipe(map((resp:any)=>{
      this.guardarEstorage(resp.id,resp.token,resp.usuario, resp.menu);
      return true;
    }));
  }

  logout(){
    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  cambiarImagen(archivo:File, id:string){
    this.subirArchivoService.subirArchivo(archivo,'usuarios',id).then((resp:any)=>{
      this.usuario.img = resp.usuarioActualizado.img;
      this.guardarEstorage(resp.usuarioActualizado.id,resp.token,resp.usuarioActualizado,this.menu);
      Swal.fire('Imagen Actualizado',this.usuario.nombre);
    })
    .catch(resp=>{
      console.log(resp);
    });
  }

  cargarUsuarios(desde:number = 0){
    let url = URL_SERVICIOS+'/usuario?desde='+desde;
    return this.http.get(url);
  }

  buscarUsuarios(termino:string){
    let url = URL_SERVICIOS+'/busqueda/coleccion/usuarios/'+termino;
    return this.http.get(url)
    .pipe(map((resp:any)=>{
      return resp.usuarios;
    }));
  }

  eliminarUsuario(id:number){
    let url = URL_SERVICIOS+'/usuario/'+id+'?token='+this.token;
    return this.http.delete(url)
    .pipe(map((resp:any)=>{
      return resp.mensaje;
    }));
  }

  actualizarToken(){
    let url = URL_SERVICIOS+'/login/renuavatoken?token='+this.token;
    return this.http.get(url).pipe(
      map((resp:any)=>{
        this.token = resp.token;
        localStorage.setItem('token',this.token);
        console.log('renovado token');
        return true;
      },catchError(error=>{
        //Swal.fire('No se pudo renovar el token',error,'error');
        //this.router.navigate(['/login']);
        return throwError(error);
      }))
    );
  }
}
