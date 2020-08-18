import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form-group-anidados-uno',
  templateUrl: './form-group-anidados-uno.component.html',
  styleUrls: ['./form-group-anidados-uno.component.css']
})
export class FormGroupAnidadosUnoComponent implements OnInit {
  resultado:string;
  formularioDatosAlumno:FormGroup;
  cursos = ['primero','segundo','tercero','cuarto','quinto'];
  constructor() { }

  ngOnInit() {
    this.formularioDatosAlumno = this.crearFormulario();
  }

  /**
   * Se crea un objeto formGroup y dentro de este otros 2 objetos formGroup
   */
  crearFormulario(){
    return new FormGroup({
      nombre: new FormControl(),
      curso:new FormControl('tercero'),
      datosPais: new FormGroup({
        pais: new FormControl(),
        ciudad: new FormControl()
      }),
      materias:new FormGroup({
        nombreMateria: new FormControl(),
        notaUno: new FormControl(),
        notaDos: new FormControl()
      })
    });
  }

  get materias(){
    return this.formularioDatosAlumno.controls.materias;
  }

  /**
   * Aqui se ve el ejemplo para acceder de formas diferentes a los formGroups anidados
   * ya sea con controls, value, o get
   */
  enviar(){
    let nombreAlumno = this.formularioDatosAlumno.controls.nombre.value;
    let curso = this.formularioDatosAlumno.value.curso;
    let pais = this.formularioDatosAlumno.controls.datosPais.value.pais;
    let notaUno = this.formularioDatosAlumno.value.materias.notaUno;
    let notaDos = this.formularioDatosAlumno.get('materias').get('notaDos').value;
    //let nombreMateria = (<FormArray>this.formularioDatosAlumno.controls['materias']).controls['nombreMateria'].value; 
    let nombreMateria = this.formularioDatosAlumno.get('materias.nombreMateria').value;
    if(notaUno>3 && notaDos > 3){
      this.resultado = 'el almuno '+nombreAlumno+' ,paso la materia: '+nombreMateria+' ,del curso: '+curso+' ,en el pais '+pais;
    } else {
      this.resultado = 'el almuno '+nombreAlumno+' ,no supero la materia: '+nombreMateria+' ,del curso: '+curso+' ,en el pais '+pais;
    }
  }

  limpiar(){
    this.resultado = '';
    this.formularioDatosAlumno = this.crearFormulario();
  }
}
