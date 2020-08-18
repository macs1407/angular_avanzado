import { Component, OnInit } from '@angular/core';
// Importar la clase FormControl
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-control-one',
  templateUrl: './control-one.component.html',
  styleUrls: ['./control-one.component.css']
})
export class ControlOneComponent implements OnInit {
  // Creamos una variable de tipo FormControl llamado actividad
  // Podemos acceder a su valor mediante el operador value y si quieremos cambiar su valor
  // lo podemos hacer mediante setValue
  actividad = new FormControl();
  // Se requiere almacenar todas las actividades que ingresa el usuario por teclado y para esto
  // Utilizamos un arreglo
  actividades : string[];

  constructor() { }

  ngOnInit() {
    this.actividades = [];
    // Comprobamos si en el local storage existen actividades para cargarlas apenas el 
    // componente este listo
    if(localStorage.getItem("actividades") != null){
      let arreglo = JSON.parse(localStorage.getItem("actividades"));
      for(let actividad of arreglo){
        this.actividades.push(actividad);
      }
    }
  }

  /**
   * Cuando se pulse agregar obtenemos del objeto actividad su valor y lo agregamos al arreglo
   * luego actualizamos el localStorage con el nuevo arreglo y por ultimo
   * seteamos el valor de la actividad a vacio
   */
  agregar(){
    this.actividades.push(this.actividad.value);
    localStorage.setItem('actividades',JSON.stringify(this.actividades));
    this.actividad.setValue('');
  }

  /**
   * Elliminamos el elemento enviado, posteriormente limpiamos el local storage y lo actualizamos
   * @param pos 
   */
  borrar(pos:number){
    this.actividades.splice(pos,1);
    localStorage.clear();
    localStorage.setItem('actividades',JSON.stringify(this.actividades));
  }

  /**
   * borra todas las actividades del arreglo y del local storage
   */
  eliminarTodo(){
    localStorage.clear();
    this.actividades = [];    
  }

}
