import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements  CanActivate{

  constructor(public usuarioService : UsuarioService){}

  canActivate() {
    // Si el usuario tiene ese role puede activar la ruta
    if(this.usuarioService.usuario.role == 'ADMIN_ROLE'){
      return true;
    }
    console.log('bloqueado por el admin guard');
    this.usuarioService.logout();
    // De lo contrario lo saca
    return false;
  }
  
}
