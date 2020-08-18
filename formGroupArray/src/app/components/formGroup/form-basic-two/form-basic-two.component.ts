import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-basic-two',
  templateUrl: './form-basic-two.component.html',
  styleUrls: ['./form-basic-two.component.css']
})
export class FormBasicTwoComponent implements OnInit {
  formularioBasicoDos : FormGroup;
  deshabilitarBoton : boolean = false;

  constructor() { }

  ngOnInit() {
    this.formularioBasicoDos = new FormGroup({
      nombre:new FormControl('',[Validators.required, Validators.minLength(5)]),
      apellidos: new FormControl('',Validators.required),
      hoobie: new FormControl(),
    });
    // Setear valor por defecto
    this.formularioBasicoDos.get('hoobie').setValue("Valor se pone defecto");
    // Deshabilitar
    this.formularioBasicoDos.get('hoobie').disable();

    this.subcripcion();
  }
  
  /**
   * Suscripción en cambios de estado y valor
   * Cuando se escribe, o se cambia el estado de un input, se puede controlar de la siguiente manera: 
   */
  subcripcion(){
    this.nombre.valueChanges.subscribe(data=>{
      console.log(data);
      if(data.length<=5){
        this.deshabilitarBoton = true;
        this.apellidos.disable();
      } else {
        this.deshabilitarBoton = false;
        this.apellidos.enable();
      }      
    });

    this.formularioBasicoDos.controls['apellidos'].valueChanges.subscribe(data=>{
      if(data.length>5){
        this.deshabilitarBoton = true;
        this.hoobie.enable();
      } else {
        this.deshabilitarBoton = false;
        this.hoobie.disable();
      }
    });
  }

  onSubmit(){
    // Obtener la informacion de todo el formulario
    console.log('Informacion de todo el formulario:',this.formularioBasicoDos.value);
    // Mostrar la informacion de cada campo
    console.log('Informacion del campo nombre',this.formularioBasicoDos.controls['nombre'].value);
    console.log('Informacion del campo apellidos',this.formularioBasicoDos.controls['apellidos'].value);
    console.log('Se cambia el valor de hoobie',this.formularioBasicoDos.controls['hoobie'].value);
  }



  /**
   * Se obtienen los controles por separado
   */
  get nombre(){
    return this.formularioBasicoDos.get("nombre");
  }

  get apellidos(){
    return this.formularioBasicoDos.get("apellidos");
  }

  get hoobie(){
    return this.formularioBasicoDos.get("hoobie");
  }
}