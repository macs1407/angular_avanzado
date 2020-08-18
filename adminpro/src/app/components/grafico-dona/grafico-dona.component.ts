import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {
  @Input('data') datos: string[] = [];
  @Input('labels') etiquetas: number[] = [];
  @Input('chartType') tipoDeGrafico : string = '';

  constructor() { }

  ngOnInit() {
    console.log('datos: '+this.datos);
    console.log('etiquetas: '+this.etiquetas);
    console.log('etiquetas: '+this.tipoDeGrafico);
  }

}
