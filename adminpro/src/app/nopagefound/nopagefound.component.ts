import { Component, OnInit } from '@angular/core';
declare function _init_plugins();
@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: []
})
export class NopagefoundComponent implements OnInit {
  anio:number = new Date().getFullYear();
  constructor() { }

  ngOnInit() {
    _init_plugins();
  }

}
