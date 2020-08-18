import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-basic-three',
  templateUrl: './form-basic-three.component.html',
  styleUrls: ['./form-basic-three.component.css']
})
export class FormBasicThreeComponent implements OnInit {
  formularioBasicoTres : FormGroup;
  deshabilitarBoton : boolean = false;

  constructor() { }

  ngOnInit() {
    this.formularioBasicoTres = new FormGroup({
      nombre:new FormControl('',[Validators.required, Validators.minLength(5)]),
      apellidos: new FormControl('',Validators.required),
      hoobie: new FormControl(),
      otrosDatos:new FormGroup({
        celular:new FormControl(),
        telefono:new FormControl(),
        direccion:new FormControl(),
        ciudad:new FormControl()
      })
    });
    // Setear valor por defecto
    this.formularioBasicoTres.get('hoobie').setValue("Valor se pone defecto");
    // Deshabilitar
    this.formularioBasicoTres.get('hoobie').disable();

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

    this.formularioBasicoTres.controls['apellidos'].valueChanges.subscribe(data=>{
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
    console.log('------------------------------------------');
    console.log('INFORMACION DE TODO EL FORMULARIO');
    console.log(this.formularioBasicoTres.value);
    console.log('------------------------------------------');
    console.log('INFORMACION POR SEPARADO');
    // Mostrar la informacion de cada campo
    console.log(this.formularioBasicoTres.controls['nombre'].value);
    console.log(this.formularioBasicoTres.controls['apellidos'].value);
    console.log(this.formularioBasicoTres.controls['hoobie'].value);
    console.log('------------------------------------------');
    console.log('INFORMACION DE TODA LA SECCION OTROS DATOS')
    console.log(this.otrosDatos.value);
    console.log('------------------------------------------');
    console.log('INFORMACION POR SEPARADO OTROS DATOS');
    console.log(this.otrosDatos.get("celular").value);
    console.log(this.telefono.value);
    console.log(this.direccion);
    console.log(this.ciudad);
  }



  /**
   * Se obtienen los controles por separado
   */
  get nombre(){
    return this.formularioBasicoTres.get("nombre");
  }

  get apellidos(){
    return this.formularioBasicoTres.get("apellidos");
  }

  get hoobie(){
    return this.formularioBasicoTres.get("hoobie");
  }

  get otrosDatos(){
    return this.formularioBasicoTres.get("otrosDatos");
  }

  get telefono(){
    return this.otrosDatos.get("telefono");
  }

  get direccion(){
    return this.formularioBasicoTres.get(['otrosDatos','direccion']).value;
  }

  get ciudad(){
    return this.formularioBasicoTres.get("otrosDatos").get("ciudad").value;
  }
}
