import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() { 
    this.contarSegundos(6).then(
      mensaje => console.log('termino', mensaje)
    ).catch(error=> console.log('error en la promesa', error));
  }

  ngOnInit() {
  }
  
  contarSegundos(numero:number):Promise<boolean>{
    return new Promise((resolve, reject)=>{
      var contador = 0;
      let intervalo = setInterval(()=>{
          contador +=1;
          console.log('contador: '+contador);
          if(contador == numero){
            resolve(true);
            clearInterval(intervalo);
          }
      }, 1000);
    });
  }
}
