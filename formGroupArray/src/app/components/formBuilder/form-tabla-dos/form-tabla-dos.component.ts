import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-tabla-dos',
  templateUrl: './form-tabla-dos.component.html',
  styleUrls: ['./form-tabla-dos.component.css']
})
export class FormTablaDosComponent implements OnInit {
  public valoresArreglo = new FormArray([]);

  categorias : any = [
    {idCategoria:1, valor:'programacion'},
    {idCategoria:2, valor:'cocina'},
    {idCategoria:3, valor:'diversion'},
    {idCategoria:4, valor:'otro'}
  ]

  etiquetas : any = [
    {
      idCategoria:1,
      valores:[
        {id: 1, titulo:'tipo', tipo : 'text', obligatorio : true},
        {id: 2, titulo:'nivel', tipo : 'number', obligatorio : true}
      ]
    },
    {
      idCategoria:2,
      valores:[
        {id: 3, titulo:'receta', tipo : 'text', obligatorio : false},
        {id: 4, titulo:'cargue', tipo : 'img', obligatorio : true},
        {id: 5, titulo:'tiempo', tipo : 'number', obligatorio : false},
        {id: 7, titulo:'grado', tipo : 'img', obligatorio : true}
      ]
    },
    {
      idCategoria:3,
      valores:[
        {id: 8, titulo:'parque', tipo : 'text', obligatorio : false},
        {id: 9, titulo:'otro', tipo : 'text', obligatorio : true},
        {id: 10, titulo:'cargue', tipo : 'img', obligatorio : true},
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
  formularioAdjunto : FormGroup;
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
    this.formularioAdjunto = this.fb.group({});
    this.columnas = [];
    this.contador = [];
    this.cadenaArreglo = "";
    this.valoresArreglo = new FormArray([]);
  }

  async capturaAdjunto(file : FileList, indice : number){
    const archivo = file[0];
    const arryayBuffer = await this.retornaPromesa(archivo) as ArrayBuffer;
    const nombre = archivo.name;
    this.formularioAdjunto.addControl('archivoTmp_'+indice, new FormControl(arryayBuffer));
    this.formularioAdjunto.addControl('archivoNombre_'+indice, new FormControl(nombre));
  }

  retornaPromesa(archivo: any):Promise<any>{
    return new Promise<any>(resolve=>{
      const fr = new FileReader();
      fr.readAsDataURL(archivo);
      fr.onload = ()=>{
        resolve(fr.result);
      }
    });
  }

  onChange() {
    this.columnas = [];
    this.cadenaArreglo = "";
    this.valoresArreglo = new FormArray([]);
    this.formularioPrincipal.get('numeroFilas').setValue(null);
    for(let i in this.etiquetas){
      if(this.etiquetas[i]['idCategoria'] == this.formularioPrincipal.get('idCategoria').value){
        for(let j in this.etiquetas[i]['valores']){
          // Arma la cadena de datos consulta ejemplo tipo,grado,
          this.cadenaArreglo = this.cadenaArreglo.concat(this.etiquetas[i]['valores'][j]['titulo']).concat(',')
          // Por cada columna de pone el: titulo, id,. tipo y si es obligatorio
          this.columnas.push({titulo: this.etiquetas[i]['valores'][j]['titulo'], 
                              identificador: this.etiquetas[i]['valores'][j]['id'],
                              tipo: this.etiquetas[i]['valores'][j]['tipo'],
                              obligatorio: this.etiquetas[i]['valores'][j]['obligatorio']});          
        }
        // Quitar la ultima coma
        this.cadenaArreglo = this.cadenaArreglo.substring(0, this.cadenaArreglo.length-1);
        // Setear los campos del dato consulta
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

  async enviar(){
    this.valoresArreglo.updateValueAndValidity();
    const valueForm = this.formularioPrincipal.getRawValue();
    console.log(valueForm);
    console.log(this.valoresArreglo.controls);
    console.log(this.formularioCamposDinamicos.controls);
    
    this.solicitud.idSolicitud = 1;
    //this.solicitud.datoSolicitud = [];
    let dato = await this.armarSolocitudDatosConsulta();
    this.solicitud.datoSolicitud = dato;
    console.log(this.solicitud);      
  }

  /**
   * Armar la estructura de solicitud dato consulta
   */
  public async armarSolocitudDatosConsulta(){
    let datoSolicitudArreglo : DatoSolicitud[] = [];
    // Comprueba si hay relacion de consultas para guardar
    if(this.valoresArreglo.length>0){
      let cuenta = 0;
      let fila = 1;
      // Itera sobre cada fila
      for(let indiceArr =0; indiceArr < this.valoresArreglo.controls.length; indiceArr++){
        if(indiceArr === cuenta){
          // Itera sobre cada columna
          for(let indiceCol = 0; indiceCol < this.columnas.length; indiceCol++){          
              let nombreArchivoAdjunto = "";
              let adjunto : any;
              let datoSolicitud : DatoSolicitud = new DatoSolicitud();
             if(this.columnas[indiceCol].tipo === 'img'){                 
                nombreArchivoAdjunto = this.formularioAdjunto.get('archivoNombre_'+(indiceArr+indiceCol)).value;     
                adjunto = this.formularioAdjunto.get('archivoTmp_'+(indiceArr+indiceCol)).value;      
              } else {
                nombreArchivoAdjunto =  "";
                adjunto = "";
              } 
              datoSolicitud.idSolicitud = 1;
              datoSolicitud.valor = this.valoresArreglo.controls[indiceArr+indiceCol].value;
              datoSolicitud.fila = fila;
              datoSolicitud.nombreArchivo = nombreArchivoAdjunto;
              datoSolicitud.tipoSolicitud = Number(this.formularioPrincipal.get('idCategoria').value);            
              datoSolicitud.nombreArchivo = nombreArchivoAdjunto;
              datoSolicitud.adjunto = adjunto;
              datoSolicitudArreglo.push(datoSolicitud);
              cuenta++;            
          }
          fila++;
        }
      }
    }
    return datoSolicitudArreglo;
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
  tipo: string;
  obligatorio: boolean;
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
  fila : number;
  nombreArchivo : string;
  adjunto : any;
  constructor(){}
}