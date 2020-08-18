import { Component, OnInit } from '@angular/core';
import { FormGroupArrayComponent } from '../../form-group-anidados/form-group-array/form-group-array.component';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-basic',
  templateUrl: './form-basic.component.html',
  styleUrls: ['./form-basic.component.css']
})
export class FormBasicComponent implements OnInit {

  formularioBasico : FormGroup;

  constructor() { }

  ngOnInit() {
    // FormGroup es un cojunto de FormControls, el estado de este objeto depende del estado de todos sus objetos
    this.formularioBasico = new FormGroup({
      // FormControl es un objeto qué se usa en los formularios para tener un control 
      // sobre su valor y su estado en el formulario
      nombre:new FormControl(),
      apellidos: new FormControl(),
      hoobie: new FormControl(),
    });
    // Setear valor por defecto
    this.formularioBasico.controls.hoobie.setValue("Valor se pone defecto");
    // Deshabilitar
    this.formularioBasico.controls.hoobie.disable();
  }

  onSubmit(){
    // Obtener la informacion de todo el formulario
    console.log('Informacion de todo el formulario:',this.formularioBasico.value);
    // Mostrar la informacion de cada campo
    console.log('Informacion del campo nombre',this.formularioBasico.controls['nombre'].value);
    console.log('Informacion del campo apellidos',this.formularioBasico.controls['apellidos'].value);
    console.log('Se cambia el valor de hoobie',this.formularioBasico.controls['hoobie'].value);
  }

  /**
   * Se obtienen los controles por separado
   */
  get nombre(){
    return this.formularioBasico.get("nombre");
  }

  get apellidos(){
    return this.formularioBasico.get("apellidos");
  }

  get hoobie(){
    return this.formularioBasico.get("hoobie");
  }
}
