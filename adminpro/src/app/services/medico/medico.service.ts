import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Medico } from 'src/app/models/medico.model';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(public http : HttpClient, public usuarioService : UsuarioService) { }


  buscarMedicos(termino:string){
    let url = URL_SERVICIOS+'/busqueda/coleccion/medicos/'+termino;
    return this.http.get(url)
    .pipe(map((resp:any)=>{
      return resp.medicos;
    }));
  }

  obtenerTodosLosMedicos(){
    let url = URL_SERVICIOS+'/medicos'
    return this.http.get(url);
  }

  guardarMedico(medico:Medico){
    let url = URL_SERVICIOS+'/medicos?token='+this.usuarioService.token;
    return this.http.post(url,medico);
  }

  actualizarMedico(medico:Medico){
    let url = URL_SERVICIOS+'/medicos/'+medico._id+'?token='+this.usuarioService.token;
    return this.http.put(url,medico);
  }

  eliminarMedico(medico:Medico){
    let url = URL_SERVICIOS+'/medicos/'+medico._id+'?token='+this.usuarioService.token;
    return this.http.delete(url);
  }

  obtenerMedico(id : number){
    let url = URL_SERVICIOS+'/medicos/'+id;
    return this.http.get(url);
  }
}
