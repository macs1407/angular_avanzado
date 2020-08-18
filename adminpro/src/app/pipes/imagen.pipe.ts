import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { ignoreElements } from 'rxjs/operators';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    console.log('tipo', tipo);
    let url = URL_SERVICIOS+'/img/';

    if(img){
      // Se verifica si biene un http para la imagen que es google
      if(img.indexOf('https')>=0){
        return img;
      }
      
      if(!img){
        return url+'/usuarios/xxx';
      }
      
      // Comprobar el tipo de imagen
      switch(tipo){
        case'usuario':
          url+='/usuarios/'+img;
        break;
        case'medico':
          url+='/medicos/'+img;
        break;
        case'hospital':
          url+='/hospitales/'+img;
        break;
        default:
          console.log('tipo de imagen de existe, usuarios, medicos, hospitales');
          url+'/usuarios/xxx';
      }
      return url;
    }
    return url+'/usuarios/xxx';    
    
  }

}
