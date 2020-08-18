import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-grafico-barra-horizontal',
  templateUrl: './grafico-barra-horizontal.component.html',
  styleUrls: ['./grafico-barra-horizontal.component.css']
})
export class GraficoBarraHorizontalComponent implements OnInit, OnDestroy {

  
  results: any[] = [
    {
      "name":"juego uno",
      "value":200
    },
    {
      "name":"juego dos",
      "value":100
    },
    {
      "name":"juego tres",
      "value":300
    },
    {
      "name":"juego cuatro",
      "value":350
    }
  ];


  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Juegos';
  showYAxisLabel = true;
  yAxisLabel = 'Votos';

  colorScheme = 'nightLights';

  intervalo;

  constructor() {
    this.intervalo = setInterval(()=>{
      console.log('ejecuta');
      // Extraer todos los objetos que estan dentro de los resultados y devuelve un nuevo arreglo 
      const newResult = [...this.results];
      for(let i in newResult){
        newResult[i].value = Math.round(Math.random()*500);
      }
      // Se crea un nuevo arreglo
      this.results = [...newResult];
    },1500);

    
  }

  ngOnInit() {
  }

  // Se ejecuta cuando se salga de este componente
  ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }

  onSelect(event) {
    console.log(event);
  }
}
