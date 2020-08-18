import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {
  emailControl:FormControl;
  formulario;
  constructor() { }

  ngOnInit() {
    this.formulario = new FormGroup({
      emailControl : new FormControl('',[Validators.required])
    });

    this.formulario.get("emailControl").valueChanges.
    pipe(
      debounceTime(350) // Tener un tiempo de inactividad entre cada valor
    )
    .subscribe(resp=>{
      console.log(resp);
    });
  }

  enviar(){
    console.log(this.formulario.controls['emailControl'].value);
  }
 
}
