import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  ajustes : Ajustes = {
    temaUrl:'assets/css/colors/default.css',
    tema:'default'
  }; 

  constructor(@Inject(DOCUMENT) private _document: Document) { 
    this.cargarAjustes();
  }
  /**
   *  Guardarlo en el local storage
   */
  guardarAjustes(){
    // Se pasa como un string por que el local storage solo recibe string
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }
  
  /**
   * Cargar los ajustes
   */
  cargarAjustes(){
    // Si existe en el localStorage
    if(localStorage.getItem('ajustes')){
      // Convetir el string a un JSON
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
      console.log('cargando del local storage');
    } else {
      console.log('usando valores por defecto');
    }
  }

  aplicarTema(tema:string){
    let url = `assets/css/colors/${tema}.css`;
    this._document.getElementById('tema').setAttribute('href', url);
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();
  }
}
interface Ajustes {
  temaUrl:string;
  tema:string;
}