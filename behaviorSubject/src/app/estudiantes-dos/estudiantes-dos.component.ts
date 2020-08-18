import { Component, OnInit } from '@angular/core';
import { Persona } from '../models/persona';
import { BehaviorSubjectService } from '../services/behavior-subject.service';

@Component({
  selector: 'app-estudiantes-dos',
  templateUrl: './estudiantes-dos.component.html',
  styleUrls: ['./estudiantes-dos.component.css']
})
export class EstudiantesDosComponent implements OnInit {
  persona:Persona = new Persona();

  constructor(private behaviorSubjectService : BehaviorSubjectService) { }

  ngOnInit() {
    // Esta pendiente de cuando se emita un cambio
    this.behaviorSubjectService.mensajeBehaviorPersonaActual$.subscribe(resp=>{
      this.persona = resp;
    })
  }

}
