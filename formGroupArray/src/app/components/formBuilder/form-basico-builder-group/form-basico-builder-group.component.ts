import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-basico-builder-group',
  templateUrl: './form-basico-builder-group.component.html',
  styleUrls: ['./form-basico-builder-group.component.css']
})
export class FormBasicoBuilderGroupComponent implements OnInit {
  resultado:string;
  formBuilderGroup:FormGroup;

  constructor(private fb : FormBuilder) { }

  ngOnInit() {
    this.formBuilderGroup = this.crearFormulario();
  }

  crearFormulario(){
    return this.fb.group({
      nombre: ['', Validators.required],
      apellidos: [''],
      otrosDatos: this.fb.group({
        pais:['', [Validators.required, Validators.maxLength(7)]],
        ciudad:['']
      })
    });
  }

  enviar(){
    this.resultado = 'nombres= '+this.formBuilderGroup.get('nombre').value
                      +' ,apellidos= '+this.formBuilderGroup.controls.apellidos.value
                      +' ,pais= '+this.formBuilderGroup.controls['otrosDatos'].get('pais').value
                      +' ,ciudad= '+this.formBuilderGroup.get('otrosDatos.ciudad').value;                      
  }

  limpiar(){
    this.formBuilderGroup = this.crearFormulario();
    this.resultado = '';
  }
}
