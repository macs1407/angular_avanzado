import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../service.index';
import { Hospital } from '../../models/hospital.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  constructor(public http : HttpClient,
              public usuarioService : UsuarioService) { }

  obtenerTodosLosHospitales(){
    let url = URL_SERVICIOS+'/hospitales';
    return this.http.get(url);
  }

  buscarHospitales(termino:string){
    let url = URL_SERVICIOS+'/busqueda/coleccion/hospitales/'+termino;
    return this.http.get(url)
    .pipe(map((resp:any)=>{
      return resp.hospitales;
    }));
  }

  guardarHospital(nombre : string){
    let url = URL_SERVICIOS+'/hospitales?token='+this.usuarioService.token;
    return this.http.post(url,{nombre:nombre});
  }

  actualizarHospital(hospital : Hospital){
    console.log('mostrar hospitales', hospital);
    let url = URL_SERVICIOS+'/hospitales/'+hospital._id+'?token='+this.usuarioService.token;
    return this.http.put(url,hospital);
  }

  eliminarHospital(hospital : Hospital){
    let url = URL_SERVICIOS+'/hospitales/'+hospital._id+'?token='+this.usuarioService.token;
    return this.http.delete(url);
  }

  obtenerHospital(hospital : Hospital){
    let url = URL_SERVICIOS+'/hospitales/'+hospital._id;
    return this.http.get(url)
    .pipe(map((resp:any)=>{
      return resp.hospital;
    }));
  }

  obtenerHospitalPorId(id : number){
    let url = URL_SERVICIOS+'/hospitales/'+id;
    return this.http.get(url)
    .pipe(map((resp:any)=>{
      return resp.hospital;
    }));
  }
}
