import { Component } from '@angular/core';
import { SettingsService } from './services/service.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adminpro';

  /**
   * Con solo inyectar el servicio se va a llamar al contructor del servicio y se invoca al metodo
   * cargarAjustes()
   * @param _ajustes 
   */
  constructor(private _ajustes : SettingsService) { }
}
