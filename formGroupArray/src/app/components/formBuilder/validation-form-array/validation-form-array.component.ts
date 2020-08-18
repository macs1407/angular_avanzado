import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

const ALL_SKILLS = [
	{ name: 'Java', displayName: 'Java' },
	{ name: 'Angular', displayName: 'Angular' },
	{ name: 'Dot Net', displayName: 'Dot Net' }
];

@Component({
  selector: 'app-validation-form-array',
  templateUrl: './validation-form-array.component.html',
  styleUrls: ['./validation-form-array.component.css']
})
export class ValidationFormArrayComponent implements OnInit {
  formTeam:FormGroup;
  isValidFormSubmitted = null;
  allSkills;


  constructor(private fb : FormBuilder) { }

  ngOnInit() {
    this.allSkills = [
      { name: 'Java', displayName: 'Java' },
      { name: 'Angular', displayName: 'Angular' },
      { name: 'Dot Net', displayName: 'Dot Net' }
    ];

    this.formTeam = this.fb.group({
      teamName: ['', Validators.required],
      description: [''],
      employees: this.fb.array([])
    });
    //console.log(this.formTeam.status);
  }

  /**
   * Este metodo crea un form group, esto agregara un employee a employess
   */
  createEmpFormGroup() {
		return this.fb.group({
			empName: ['', [Validators.required]],
			age: ['', [Validators.required, Validators.min(21)]],
			skill: ['', [Validators.required]],
		})
	}

  /**
   * Para acceder al estado del array y a sus elementos, creamos un metodo getter
   * y se hace un cast de un FormArray
   */
  get employees():FormArray{
    return this.formTeam.get('employees') as FormArray;
  }

  get teamName(){
    return this.formTeam.get('teamName');
  }

  get description(){
    return this.formTeam.get('description');
  }

  /**
   * Agregar un empleado al array
   */
  addEmployee(){
    this.employees.push(this.createEmpFormGroup());
  }

  /**
   * Eliminar un empleado del array
   * @param index 
   */
  deleteEmployee(index:number){
    this.employees.removeAt(index);
  }

  /**
   * Enviar formulario
   */
  onSubmit(){
    this.isValidFormSubmitted = false;
    if(this.formTeam.invalid){
      return;
    }
    this.isValidFormSubmitted = true;
    let team : Team = this.formTeam.value;
    this.save(team);
    this.reset();
  }


  save(team:Team){
    console.log('------------TEAM------------');
    console.log('Team name: ',team.teamName);
    console.log('Team description: ',team.description);
    // Se muestran 2 formas diferentes de acceder a una posicion de un array
    if(this.formTeam.get('employees').get(''+0) != undefined){
      console.log('----- Position one -----');
      let empName = this.formTeam.get('employees').get(''+0).get('empName');
      console.log('empName', empName.value);
    }
    if(this.formTeam.controls.employees['controls'][''+1] != undefined){
      console.log('----- Position two -----');
      let empNameOne = this.formTeam.controls.employees['controls'][''+1].get('empName');
      console.log('empNameOne', empNameOne.value);
    }
    
    console.log('----- Employee Details -----');
    for(let t of team.employees){
      console.log('Emp name: ',t.empName);
      console.log('Emp age: ',t.age);
      console.log('Emp skill: ',t.skill);
    }
  }

  /**
   * Resetear formulario
   */
  reset(){
    this.formTeam = this.fb.group({
      teamName: ['', Validators.required],
      description: [''],
      employees: this.fb.array([])
    });
  }
}
/**
 * Modelo
 */
export class Team {
  teamName: string;
  description: string;
	employees: Employee[];
} 

export class Employee {
	empName = null;
	age: number = null;
	skill = null;
} 