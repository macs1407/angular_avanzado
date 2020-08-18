import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productsForm:FormGroup;

  constructor(private _productService : ProductService) { }

  ngOnInit() {
    this.productsForm = this.crearFormulario();
    this._productService.productoSubjectObservador.subscribe((data : Product)=>{
      if(data.$key != undefined && data.$key != null){
        console.log('escucha',data);
        this.productsForm.get('$key').setValue(data.$key);
        this.productsForm.get('category').setValue(data.category);
        this.productsForm.get('location').setValue(data.location);
        this.productsForm.get('name').setValue(data.name);
        this.productsForm.get('price').setValue(data.price);
      }      
    });
    
  }

  crearFormulario(){
    return new FormGroup({
      $key:new FormControl(),
      name:new FormControl('', Validators.required),
      category:new FormControl('', Validators.required),
      location:new FormControl('', Validators.required),
      price:new FormControl('', Validators.required)
    });
  }

  enviar(){
    let product : Product = new Product();
    product.name = this.productsForm.value.name;
    product.category = this.productsForm.value.category;
    product.location = this.productsForm.value.location;
    product.price = this.productsForm.value.price;    
    if(this.productsForm.value.$key != undefined && this.productsForm.value.$key != null){
      product.$key = this.productsForm.value.$key;
      this._productService.updateProduct(product);
    } else {
      this._productService.insertProduct(product);
    }
    console.log('product', product);
    this.productsForm = this.crearFormulario();
  }

  limpiar(){
    this.productsForm = this.crearFormulario();
  }

}
