import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Persona } from '../models/persona';

@Injectable()
export class BehaviorSubjectService {
  // Crear observador
  private mensajeBehaviorPersona = new BehaviorSubject<Persona>(new Persona());
  // Esta variable nos sirve para suscribirnos a mensajeBehaviorPersona "observador"
  // y ser notificado, de cualquier cambio que ocurra
  mensajeBehaviorPersonaActual$ = this.mensajeBehaviorPersona.asObservable(); 
  
  constructor() { }

  cambiarPersona(persona:Persona){
    // Enviar un objeto de tipo persona
    this.mensajeBehaviorPersona.next(persona);
  }

}
