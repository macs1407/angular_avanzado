import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {
  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(public activatedRouted : ActivatedRoute,
              public http : HttpClient) { }

  ngOnInit() {
    console.log('termino');
    this.activatedRouted.params.subscribe(params=>{
      let termino = params['termino'];
      console.log('termino',termino);
      this.buscar(termino);
    })
  }

  buscar(termino:string){
    let url = URL_SERVICIOS+'/busqueda/todo/'+termino;
    this.http.get(url).subscribe((resp:any)=>{
      this.usuarios = resp.usuarios;
      this.hospitales = resp.hospitales;
      this.medicos = resp.medicos;
    });
  }
}
