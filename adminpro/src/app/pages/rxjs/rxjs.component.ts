import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  
  // Variable que mantiene una referencia al observador que se esta ejecutando
  subcripcion : Subscription;

  constructor() { 
  
    // Para escuchar el trabajo del observador necesito suscribirme
    this.subcripcion = this.regresaObservable().subscribe(
      numero =>console.log('subs', numero), // Primero que se ejecuta cuando se llama a un next
      error => console.error('error en el obs', error), // Se ejecuta cuando ocurre un error
      ()=> console.log('el observador termino') // Se ejcuta cuando se acaba el observador;
    );
  }
  
  // Se ejcuta cuando se inicializa el componente
  ngOnInit() {
  }

  // Se dispara cada vez que se vaya a dejar la pagina
  ngOnDestroy(): void {
    this.subcripcion.unsubscribe();
    console.log('saliendo de la pagina');
  }
  
  regresaObservable():Observable<any>{
    return new Observable((observer: Subscriber<any>)=>{
      let contador = 0;
      let intervalo = setInterval(()=>{
        contador += 1;
        const salida = {
          valor: contador
        }
        observer.next(salida); // El next emite el contador
      },1000);
    }).pipe(
      map(resp=>{ // Transformar la informacion
        return resp.valor;
      }),
      filter((valor, index)=>{ // Filtrar los datos que se van a devolver
        if((valor%2) ===1){
          // par
          return true;
        } else {
          //impar
          return false;
        }
      })
    );
  }
}
