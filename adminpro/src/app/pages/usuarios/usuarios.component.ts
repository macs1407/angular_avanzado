import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios :Usuario[] =[];
  desde:number = 0;
  totalRegistros:number = 0;
  cargando:boolean=true;

  constructor(public usuariosService : UsuarioService,
              public modalUploadService : ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalUploadService.notificacion.subscribe(resp=>{
      this.cargarUsuarios();
    });
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuariosService.cargarUsuarios(this.desde).subscribe((resp:any)=>{
      console.log(JSON.stringify(resp));
      this.usuarios = resp.usuarios;
      this.totalRegistros = resp.total;
      this.cargando = false;
    })
  }

  cambiarDesde(valor:number){
    //this.desde = this.desde + valor;
    if(this.desde>=this.totalRegistros){
      return;
    }
    if(this.desde<0){
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino:string){
    if(!termino){
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this.usuariosService.buscarUsuarios(termino).subscribe((usuarios:Usuario[])=>{
      this.usuarios = usuarios;
      this.cargando = false;
    })
  }

  borrarUsuario(usuario){
    let usuarioEnSession : Usuario = JSON.parse(localStorage.getItem('usuario')); 
    if(usuario._id === usuarioEnSession._id){
      Swal.fire('Borrar usuario','No se puede eliminar usted mismo', 'error');
      return;
    }
    Swal.fire({
      title: '¿Borrar usuario?',
      text: "Esta seguro que desea borrar el usuario, esta a punto de eliminar a "+usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, eliminarlo!'
    }).then((result) => {
      if (result.value) {

        this.usuariosService.eliminarUsuario(usuario._id).subscribe(resp=>{
          this.cargarUsuarios();
          Swal.fire('Borrar usuario','Se elimino el usuario', 'success');
        });
        
      }
    });
  }

  guardarUsuario(usuario:Usuario){
    this.usuariosService.actualizarUsuario(usuario).subscribe();
  }

  invocarModal(usuario : Usuario){
    this.modalUploadService.mostrarModal('usuarios',usuario._id);
  }
}
