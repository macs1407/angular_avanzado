import { Component, OnInit } from '@angular/core';
// Importamos ahora las clases FormControl y FormGroup:
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-basic-one',
  templateUrl: './form-basic-one.component.html',
  styleUrls: ['./form-basic-one.component.css']
})
export class FormBasicOneComponent implements OnInit {
  // Variable para mostrar en la salida
  datos:string;
  formularioContacto:FormGroup;
  constructor() { }

  ngOnInit() {
    // Creamos un objeto de la clase FormGroup y le pasamos al constructor un objeto literal con la
    // creacion  de un objeto de la clase formControl por cada objeto visual de la vista
    this.formularioContacto = this.crearFormulario();
  }

  crearFormulario(){
    return new FormGroup({
      nombre: new FormControl(),
      apellidos: new FormControl(),
      email: new FormControl(),
      mensaje: new FormControl()
    }); 
  }

  /**
   * FormGroup.get esta diseñado para acceder al control del formulario de destino por su path
   * y se usa con mas frecuencia para situaciones complicadas (incrustacion de multiples capas)
   * lo que facilita obtener el control de destino desde el formulario de incrsutacion de 
   * multiples capas y tambien hace que el codigo sea mas facil de comprender y entender
   * 
   * Por ejemplo simplemente se puede acceder al primer elemento del formArray con
   * this.form.get('test.0') en lugar de this.form.controls.test.controls[0]
   */
  enviar(){
    console.log(this.formularioContacto);
    this.datos = `nombre=${this.formularioContacto.controls.nombre.value}
                  apellidos=${this.formularioContacto.value.apellidos}
                  email=${this.formularioContacto.get('email').value}
                  mensaje=${this.formularioContacto.controls['mensaje'].value}`;
  }

  resetar(){
    this.datos = '';
    this.formularioContacto = this.crearFormulario();
   }
} 
