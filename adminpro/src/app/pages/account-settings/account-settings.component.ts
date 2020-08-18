import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from 'src/app/services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(private _ajustes : SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(tema:string, link : any){
    this.aplicarCheck(link);
    this._ajustes.aplicarTema(tema);
  }

  aplicarCheck(link:any){
    // Obtener la referencia de a los elementos de la lista
    let selectores:any = document.getElementsByClassName('selector');
    // Recorrere los elementos para eliminar la clase working que es la de el estilo de check "seleccionado"
    for(let ref of selectores){
      ref.classList.remove('working');
    }
    // Aplicar la clase working
    link.classList.add('working');
  }

  colocarCheck(){
    // Obtener la referencia de a los elementos de la lista
    let selectores:any = document.getElementsByClassName('selector');
    let tema = this._ajustes.ajustes.tema;
    // Recorrere los elementos para eliminar la clase working que es la de el estilo de check "seleccionado"
    for(let ref of selectores){
      if(ref.getAttribute('data-theme')==tema){
        // Aplicar la clase working
        ref.classList.add('working');
        break;
      }
    }
  }
}
