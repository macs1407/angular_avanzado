import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  titulo : string;
  constructor(private route : Router,
              private title : Title) {
    this.getDataRoute().subscribe(data=>{
      this.titulo = data.titulo; // Titulo que sale del pages.routing que configuramos
      this.title.setTitle(this.titulo); // Titulo propio de angular
    });
   }

  ngOnInit() {
  }
  
  getDataRoute(){
    return this.route.events.pipe(
      filter(eventos=> eventos instanceof ActivationEnd), // Filtar solo los que son instancia de ActivationEnd
      filter((eventos : ActivationEnd)=> eventos.snapshot.firstChild === null), // Si el firstChild es nulo
      map((evento : ActivationEnd)=>evento.snapshot.data) // Se retorna solo la data que contiene el titulo en el pages.routing 
    );
  }
}
