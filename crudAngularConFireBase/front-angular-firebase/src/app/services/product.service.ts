import { Injectable } from '@angular/core';
import {AngularFireList, AngularFireDatabase} from 'angularfire2/database'
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class ProductService {

  productList: AngularFireList<any>;
  selectProduct:Product = new Product();
  emitirProductoSubject = new BehaviorSubject<Object>(Product);
  productoSubjectObservador = this.emitirProductoSubject.asObservable();

  constructor(private fireDataBase: AngularFireDatabase) { }


  getProducst(){
    return this.productList = this.fireDataBase.list('/products');
  }

  insertProduct(product : Product){
    this.productList.push({
      name:product.name,
      category:product.category,
      location:product.location,
      price: product.price
    });
  }

  /**
   * Actualizar los campos de la clave que se la pasa
   * @param product
   */
  updateProduct(product: Product){
    this.productList.update(product.$key,{
      nombre:product.name,
      category:product.category,
      location:product.location,
      price: product.price
    });
  }

  deleteProduct($key:string){
    this.productList.remove($key);
  }

  seleccionarProducto(product : Product){
    this.emitirProductoSubject.next(product);
  }
}
