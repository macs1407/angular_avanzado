import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { element } from 'protractor';

@Component({
  selector: 'app-group-array',
  templateUrl: './group-array.component.html',
  styleUrls: ['./group-array.component.css']
})
export class GroupArrayComponent implements OnInit {
  nombre:string;
  telefonos:string;
  hoobies:string;
  formGroupArray:FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.formGroupArray = this.crearFormulario();
  }

  /**
   * Crear el formulario principal
   */
  crearFormulario(){
    return this.fb.group({
      nombre:['',Validators.required],
      edad:[''],
      telefonos:this.fb.array([]),
      hoobies:this.fb.array([])
    });
  }

  /**
   * Crear items para telefonos
   */
  crearTelefonos(){
    return this.fb.group({
      fijo:[''],
      celular:['',Validators.required]
    });
  }

  /**
   * Crear items para hoobies
   */
  crearHoobies(){
    return this.fb.group({
      tipoHoobie:['',Validators.required],
      nombreHoobie:['programacion', Validators.required],
      descripcion:['']
    });
  }

  /**
   * Agregar Telefonos
   */
  agregarTelefonos(){
    this.telefonosForm.push(this.crearTelefonos());
  }

  /**
   * Agregar hoobies
   */
  agregarHoobies(){
    (this.formGroupArray.get('hoobies')as FormArray).push(this.crearHoobies());
  }

  /**
   * Obtener la parte de los telefonos como un array para devolver a la vista
   */
  get telefonosForm():FormArray{
    return this.formGroupArray.get('telefonos') as FormArray;
  }

  get hoobiesForm():FormArray{
    return this.formGroupArray.get('hoobies') as FormArray;
  }

  enviar(){
    this.remplazarDescripcionHoobie();
    this.nombre = 'Nombre = '+this.formGroupArray.value.nombre;
    (this.formGroupArray.get('hoobies') as FormArray).controls.forEach((element:any)=>{
      console.log('element',element.get('tipoHoobie').value);
      if(element.get('tipoHoobie').value === null || element.get('tipoHoobie').value === ''){
        element.get('tipoHoobie').clearValidators();
        element.get('tipoHoobie').setValidators([Validators.required]);        
        element.get('tipoHoobie').updateValueAndValidity();
      }
    });
    this.formGroupArray.updateValueAndValidity();
    this.validateAllFormFields(this.formGroupArray.get('hoobies') as FormGroup);
   /* this.telefonos = this.retornarTelefonos();
    this.hoobies = this.retornarHoobies();
    this.formGroupArray = this.crearFormulario();*/
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  /**
   * Iterar el array de hoobies
   * se puede hacer de la siguiente manera:
   * (this.formGroupArray.controls['hoobies'] as FormArray).controls.forEach
   * (this.formGroupArray.get('hoobies') as FormArray).controls.forEach
   */
  remplazarDescripcionHoobie(){
    let aumenta = 0;
    (this.formGroupArray.controls['hoobies'] as FormArray).controls.forEach(element => {
      this.formGroupArray.get('hoobies')
          .get(''+aumenta)
          .get('descripcion').setValue('Se envia por defecto desde el back');
      aumenta++;
    });
  }

  /**
   * Retorna una cadena con los telefonos
   */
  retornarTelefonos(){
    let telefonos = '';
    let contador = 0;
    for(let f of (this.formGroupArray.get('telefonos') as FormArray).controls){
      if(contador == 0){
        telefonos = telefonos+'Fijo= '+f.get('fijo').value;
      } else {
        telefonos = telefonos+' ,Fijo= '+f.get('fijo').value
      }
      telefonos = telefonos+" ,celular= "+f.get('celular').value;
      contador++;
    }
    return telefonos;
  }

  /**
   * Retorna los hoobies
   */
  retornarHoobies(){
    let hoobies = '';
    let contador;
    (this.formGroupArray.get('hoobies') as FormArray).controls.forEach((element:any)=>{
      console.log('element',element.get('tipoHoobie').value);
      if(contador == 0){
        hoobies = hoobies +',Tipo Hoobie= '+element.get('tipoHoobie').value;
      } else {
        hoobies = hoobies +'Tipo Hoobie= '+element.get('tipoHoobie').value;
      }
      element.get('tipoHoobie').setValidators([Validators.required]);
      element.get('tipoHoobie').updateValueAndValidity();

      hoobies = hoobies +',Nombre Hoobie= '+element.get('nombreHoobie').value+' ,descripcion= '+element.get('descripcion').value;

      contador ++;
    });
    return hoobies;
  }
}
