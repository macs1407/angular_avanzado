import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import Swal from 'sweetalert2';
declare function _init_plugins(); // Llamar cualquier script que este fuera de angular
declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  recuerdame:boolean=false;
  email:string;
  auth2:any;

  constructor(public router : Router,
              public usuarioService : UsuarioService) { }

  ngOnInit() {
    _init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || "";
    if(this.email.length>0){
      this.recuerdame = true;
    }
  }
  
  googleInit(){
    gapi.load('auth2',()=>{
      this.auth2 = gapi.auth2.init({
        client_id : '1752143327-cof6047q2kett8ucusi9i6fvfm0ilu8a.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scoope: 'profile email'
      });
      this.attachSingin(document.getElementById('btnGoogle'));
    });
  }

  attachSingin(element){
    this.auth2.attachClickHandler(element, {}, googlseUser=>{
      let token = googlseUser.getAuthResponse().id_token;
      console.log(token);
      this.usuarioService.loginGoogle(token).subscribe(resp=>{
        console.log(JSON.stringify(resp));
        this.router.navigate(['/dashboard']);
      });
    });
  }

  ingresar(forma : NgForm){
    if(forma.invalid){
      return;
    }
    let usuario : Usuario = new Usuario(null, forma.value.email, forma.value.password);
    this.usuarioService.login(usuario, this.recuerdame).subscribe(resp=>{
      console.log(JSON.stringify(resp));
      window.location.href='#/dashboard'; // Redireccion manual con manila java script
    },error=>{
      Swal.fire('Se ha presentado un error',
                error.status+' - '+error.error.mensaje,
                'error');

      console.log(error.status);

    });
  }
}
