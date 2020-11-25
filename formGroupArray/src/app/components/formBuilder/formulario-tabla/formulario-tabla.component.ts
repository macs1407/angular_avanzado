import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-formulario-tabla',
  templateUrl: './formulario-tabla.component.html',
  styleUrls: ['./formulario-tabla.component.css']
})
export class FormularioTablaComponent implements OnInit {
  public valoresArreglo = new FormArray([]);

  categorias : any = [
    {idCategoria:1, valor:'programacion'},
    {idCategoria:2, valor:'cocina'},
    {idCategoria:3, valor:'diversion'},
    {idCategoria:4, valor:'otro'}
  ]

  /*etiquetas : any = [
    {
      idCategoria:1,
      valores:['tipo', 'nivel']
    },
    {
      idCategoria:2,
      valores:['receta', 'tiempo', 'grado']
    },
    {
      idCategoria:3,
      valores:['parque']
    }
  ]*/

  etiquetas : any = [
    {
      idCategoria:1,
      valores:[
        {id: 1, titulo:'tipo'},
        {id: 2, titulo:'nivel'}
      ]
    },
    {
      idCategoria:2,
      valores:[
        {id: 3, titulo:'receta'},
        {id: 4, titulo:'tiempo'},
        {id: 5, titulo:'grado'}
      ]
    },
    {
      idCategoria:3,
      valores:[
        {id: 6, titulo:'parque'},
        {id: 7, titulo:'otro'}
      ]
    },
    {
      idCategoria:4,
      valores:[
        {id: 8, titulo:'hoobie'}
      ]
    }
  ]

  public columnas: Columna[] = [];
  public contador : number[];
  formularioPrincipal : FormGroup;
  formularioCamposDinamicos : FormGroup;
  cadenaArreglo : String;

  solicitud : Solicitud = new Solicitud();

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.crearFormulario();
  }

  crearFormulario(){
    this.formularioPrincipal = this.fb.group({
      idCategoria:[''],
      camposMostrar:[''],
      numeroFilas:[''],
      valores:this.fb.group({})
    });
    this.formularioCamposDinamicos = this.fb.group({});
    this.columnas = [];
    this.contador = [];
    this.cadenaArreglo = "";
    this.valoresArreglo = new FormArray([]);
  }

  onChange() {
    this.columnas = [];
    this.cadenaArreglo = "";
    this.valoresArreglo = new FormArray([]);
    this.formularioPrincipal.get('numeroFilas').setValue(null);
    for(let i in this.etiquetas){
      if(this.etiquetas[i]['idCategoria'] == this.formularioPrincipal.get('idCategoria').value){
        for(let j in this.etiquetas[i]['valores']){
          this.cadenaArreglo = this.cadenaArreglo.concat(this.etiquetas[i]['valores'][j]['titulo']).concat(',')

          this.columnas.push({titulo:this.etiquetas[i]['valores'][j]['titulo'], 
                              identificador:this.etiquetas[i]['valores'][j]['id']});
                              console.log(this.columnas);
        }
        this.cadenaArreglo = this.cadenaArreglo.substring(0, this.cadenaArreglo.length-1);
        this.formularioPrincipal.get('camposMostrar').setValue(this.cadenaArreglo);
      }
    }
  }


  construyeTabla() {
    this.formularioCamposDinamicos = this.fb.group({});
    this.valoresArreglo = new FormArray([]);
    this.contador = [];
    this.addControles();
  }

  private addControles() {
    if (this.getControl('numeroFilas').value !== '') {
      const cantidadDatos = (Number(String(this.getControl('numeroFilas').value).trim()) * this.columnas.length);
      for (let index = 0; index < cantidadDatos; index++) {
        this.valoresArreglo.push( new FormControl());
      }
      const divisionFilas = this.valoresArreglo.controls.length / Number(String(this.getControl('numeroFilas').value).trim());
      this.contador.push(0);
      let saltos = divisionFilas;
      for (let index = 0; index < this.valoresArreglo.controls.length; index++) {
        if (saltos === index) {
          this.contador.push(index);
          saltos += divisionFilas;
        }
      }
      this.formularioCamposDinamicos.addControl('valores', this.valoresArreglo);
      this.valoresForm.addControl('valores', this.valoresArreglo);
    }
  }

  enviar(){
    const valueForm = this.formularioPrincipal.getRawValue();
    console.log(valueForm);
    console.log(this.valoresArreglo.controls);
    console.log(this.formularioCamposDinamicos.controls);
    
    this.solicitud.idSolicitud = 1;
    this.solicitud.datoSolicitud = [];    let cuenta = 0;
    this.valoresArreglo.controls.forEach((valorArr, indiceArr)=>{
      if(indiceArr === cuenta){
        this.columnas.forEach((valorCol, indiceCol)=>{
          let datoSolicitud : DatoSolicitud = new DatoSolicitud();
          datoSolicitud.idDatoSolicitud =  valorCol.identificador;
          datoSolicitud.valor = this.valoresArreglo.controls[indiceArr+indiceCol].value;
          
          this.solicitud.datoSolicitud.push(datoSolicitud);
          cuenta++;
        });
      }
    });

    console.log(this.solicitud);  
    
  }

  get valoresForm():FormGroup{
    return this.getControl('valores') as FormGroup;
  }

  /**
   * Obtiene un control
   * @param control 
   */
  getControl(control: string): AbstractControl {
    return this.formularioPrincipal.get(control);
  }
}

interface Columna {
  titulo : string;
  identificador : string;
}

class Solicitud {
  idSolicitud ?: number;
  datoSolicitud ?: DatoSolicitud [];
  constructor(){}
}

class DatoSolicitud {
  idSolicitud : number;
  tipoSolicitud : number;
  idDatoSolicitud : string;
  valor: String;
  constructor(){}
}