import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-basico-builder',
  templateUrl: './form-basico-builder.component.html',
  styleUrls: ['./form-basico-builder.component.css']
})
export class FormBasicoBuilderComponent implements OnInit {
  resultado:string;
  formBasico:FormGroup;

  // Se inyecta al constructor un objeto de la clase Builder
  constructor(private fb : FormBuilder) { }

  ngOnInit() {
    this.formBasico = this.crearFormulario();
  }

  /**
   * Llamamos al metodo group del objeto FORMBUILDER y le pasamos un objeto literal indicando
   * como atributos los nombres de los controles visuales definidos en el html en cada control 
   * pasamos un valor en blanco y en el segundo un arreglo con las validaciones
   */
  crearFormulario(){
    return this.fb.group({
      nombre: ['',[Validators.required, Validators.minLength(10)]],
      mail: ['',[Validators.required, Validators.email]],
      mensaje:['',[Validators.required, Validators.maxLength(100)]]
    });
  }

  /**
   * Accedemos a los valores del formulario de cada elemento
   */
  enviar(){
    this.resultado = 'Nombre= '+this.formBasico.value.nombre
                      +', mail= '+this.formBasico.controls['mail'].value
                      +', mensaje= '+this.formBasico.get('mensaje').value;
  }

  limpiar(){
    this.formBasico = this.crearFormulario();
    this.resultado = '';
  }
}
