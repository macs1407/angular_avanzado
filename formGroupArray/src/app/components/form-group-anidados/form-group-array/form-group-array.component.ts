import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form-group-array',
  templateUrl: './form-group-array.component.html',
  styleUrls: ['./form-group-array.component.css']
})
export class FormGroupArrayComponent implements OnInit {
  userProfileForm : FormGroup;

  constructor(private fb: FormBuilder){
  }
  
  ngOnInit(): void {
    this.userProfileForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName:[''],
      // Arreglo de direcciones
      address: this.fb.array([       
      ]), 
      // Arreglo de mobiles
      mobiles:this.fb.array([  
      ])
    });
  }

  /**
   * Convierte mobiles en un arreglo 
   */
  get mobiles():FormArray{
    return this.userProfileForm.get("mobiles") as FormArray;
  }
  
  /**
   * Agrega un nuevo elemento a mobiles
   */
  newMobile(){
    return this.mobiles.push(this.fb.control('',Validators.required));
  }

  get address():FormArray{
    return this.userProfileForm.get("address") as FormArray;
  }

  newAddress(){
    const add = this.fb.group({
      address1:['', Validators.required],
      address2:[''],
      state:[''],
      zip:['']
    });
    this.address.push(add);
  }

  eliminarTelefono(indice){
    this.mobiles.removeAt(indice);
  }

  eliminarCompuesto(indice){
    this.address.removeAt(indice);
  }

  enviar(){
    let primerNombre = this.userProfileForm.get("firstName").value;
    let segundoNombre = this.userProfileForm.get("lastName").value;
    alert('datos'+primerNombre+' - '+segundoNombre);
    // Iteramos los mobiles
    let contador = 0;
    for(let mobile of this.mobiles.controls){
      let valor = this.userProfileForm.get(["mobiles",contador]).value;
      console.log('telefono',valor);
      contador++;
    }

    // Iteramos los mobiles
    let contador1 = 0;
    for(let adress of this.address.controls){
      console.log("adress",adress.get("address1").value);
      let address = this.userProfileForm.get(["address",contador1]).value;
      let address1 = address["address1"];
      let address2 = address["address2"];
      console.log('direccion',address);
      console.log('address1',address1);
      console.log('address2',address2);
      contador1++;
    }
    
  }
}

export class country {
  id: string;
  name: string;
 
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}