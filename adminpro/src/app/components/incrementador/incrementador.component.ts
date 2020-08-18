import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  // Hace referencia a un elemento HTML en especifico y se nombre en el html con #txtProgeso
  // Para poder hacer referencia desde el TypeScript
  @ViewChild('txtProgreso',{static:true}) txtProgreso:ElementRef;

  // Atributos o variables que bienen desde el elemento padre
  @Input('nombre') leyenda:string='Leyenda';
  @Input() progreso:number=50;
  
  // Notificar a quien lo llame "padre" que hubo cambios
  @Output('actualizaValor')cambioValor:EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  
  /**
   * Metodo que se dispara cuando se pulsa sobre un boton
   */
  cambiarValor(valor){
    if(this.progreso >=100 && valor>0){
      this.progreso = 100;
      return;
    } 
    if(this.progreso <=0 && valor<0 ){
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + valor;
    // Emitir un cambio
    this.cambioValor.emit(this.progreso);
    this.txtProgreso.nativeElement.focus();
  }
  
  /**
   * Se dispara cuando se cambia el valor sobre la caja de texto
   * @param newValue 
   */
  onChange(newValue:number){
    if(newValue>=100){
      this.progreso=100;
    } else if(newValue <=0){
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    this.txtProgreso.nativeElement.value = Number(this.progreso);

    this.cambioValor.emit(this.progreso);
  }

}
