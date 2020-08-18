import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { parse } from 'querystring';

@Component({
  selector: 'app-form-controles-check-radio-select',
  templateUrl: './form-controles-check-radio-select.component.html',
  styleUrls: ['./form-controles-check-radio-select.component.css']
})
export class FormControlesCheckRadioSelectComponent implements OnInit {
  conversion: string;
  potenciaNumero:number;
  cantidad:number;

  formularioConversion:FormGroup;
  constructor() { }

  ngOnInit() {
    this.formularioConversion = this.cargarFormulario();
  }

  /**
   * Creamos un objeto formGroup  y le pasamos un objeto literal con la referencia a 
   * 4 controles de formulario que necesitamos
   */
  cargarFormulario(){
    return new FormGroup({
      numeroDecimal: new FormControl(''),
      base: new FormControl('octal'),
      potencia: new FormControl('2'),
      largo: new FormControl(false)
    });
  }

  /**
   * Metodos get y diferentes formas de acceder al valor de un objeto dentro de un
   * formGroup
   */
  get numeroDecimal(){
    return this.formularioConversion.controls['numeroDecimal'].value;
  }

  get base(){
    return this.formularioConversion.value.base;
  }

  get potencia(){
    return this.formularioConversion.get('potencia').value;
  }

  get largo(){
    return this.formularioConversion.controls.largo.value;
  }

  enviar(){    
    if(this.base == 'hexademical'){
      this.conversion = parseInt(this.formularioConversion.controls['numeroDecimal'].value).toString(16);
    }
    if(this.base == 'octal'){
      this.conversion = parseInt(this.formularioConversion.controls.numeroDecimal.value).toString(8)
    }
    this.potenciaNumero = Math.pow(parseInt(this.formularioConversion.value.numeroDecimal),
                                   parseInt(this.formularioConversion.get('potencia').value));
    if(this.largo){
      this.cantidad = this.numeroDecimal.length;
    }
  }

  limpiar(){
    this.formularioConversion = this.cargarFormulario();
  }
}
