import { Component } from '@angular/core';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private usuarios : UsuariosService){
    this.usuarios.obtenerUsuarios().subscribe(resp=>{
      console.log(resp);
    },error=>{
      console.log('Se ha presentado un error:',error)
    });
  }


}
