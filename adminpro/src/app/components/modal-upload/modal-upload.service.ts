import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  // Variables que se reciben desde otras paginas
  public tipo: string;
  public id : string;
  
  public oculto : string = 'oculto';

  // Notificar a los demas componentes
  public notificacion = new EventEmitter<any>();

  constructor() {
  }

  ocultarModal(){
    this.oculto = 'oculto';
    this.tipo = null;
    this.id = null;
  }

  mostrarModal(tipo:string, id:string){
    this.tipo = tipo;
    this.id = id;
    this.oculto = '';
    console.log(tipo,id);
  }
}
