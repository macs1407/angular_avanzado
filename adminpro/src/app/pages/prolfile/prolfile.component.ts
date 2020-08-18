import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prolfile',
  templateUrl: './prolfile.component.html',
  styles: []
})
export class ProlfileComponent implements OnInit {
  usuario:Usuario;
  imagenSubir:File;
  imagenTemp:string;

  constructor(public usuarioService : UsuarioService) { 
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit() {
    
  }

  seleccionImagen(archivo:File){
    if(!archivo){
      this.imagenSubir = null;
      return;
    }
    if(archivo.type.indexOf('image')<0){
      Swal.fire('Se aceptan solo imagenes', 'el archivo seleccionado no es una imagen');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    // Imagen temporal con manila java script
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = ()=>{
      this.imagenTemp = reader.result as string;
    }
  }

  cambiarImagen(){
    this.usuarioService.cambiarImagen(this.imagenSubir,this.usuario._id);
  }

  guardar(usuario:Usuario){
    this.usuario.nombre = usuario.nombre;
    // Si no es un usuario de google permite actualizar el correo
    if(!this.usuario.google){
      this.usuario.email = usuario.email;
    }

    this.usuarioService.actualizarUsuario(this.usuario).subscribe(resp=>{
      console.log('resp',resp);
    },error=>{
      Swal.fire('Se ha presentado un error',
                error.status+' - '+error.error.mensaje,
                'error');
    });
  }
}
