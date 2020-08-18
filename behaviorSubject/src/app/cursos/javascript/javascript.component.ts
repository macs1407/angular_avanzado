import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/persona';
import { BehaviorSubjectService } from '../../services/behavior-subject.service';

@Component({
  selector: 'app-javascript',
  templateUrl: './javascript.component.html',
  styleUrls: ['./javascript.component.css']
})
export class JavascriptComponent implements OnInit {
  persona:Persona;
  enviado:boolean = false;

  constructor(private behaviorSubjectService : BehaviorSubjectService) { }

  ngOnInit() {
    this.persona = new Persona();
  }

  cambiarPersona(){
    this.enviado = true;
    console.log('cambiar persona',this.persona);
    this.behaviorSubjectService.cambiarPersona(this.persona);
  }

  cancelar(){
    this.enviado = false;
    this.persona = new Persona();
    this.behaviorSubjectService.cambiarPersona(new Persona());
  }
}
