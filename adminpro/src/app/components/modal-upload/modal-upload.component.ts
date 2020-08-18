import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  imagenSubir:File;
  imagenTemp:string;

  constructor(public subirArchivoService : SubirArchivoService,
             public modalUploadService : ModalUploadService) { }

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

  subirImagen(){
    console.log('subir imagen',this.modalUploadService.tipo, this.modalUploadService.id);
    this.subirArchivoService.subirArchivo(this.imagenSubir
                                          ,this.modalUploadService.tipo
                                          ,this.modalUploadService.id)
    .then(resp=>{
      console.log(JSON.stringify(resp));
      this.modalUploadService.notificacion.emit(resp);
      this.cerrarModal();
    }).catch(err=>{
      console.log('error en la carga',err);
    });
  }

  cerrarModal(){
    this.imagenSubir = null;
    this.imagenTemp = null;
    this.modalUploadService.ocultarModal();
  }
}
