import { Component, OnInit } from '@angular/core';
declare function _init_plugins(); // Llamar cualquier script que este fuera de angular
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
    // Llama una funcion java svcript
    _init_plugins();
  }

}
