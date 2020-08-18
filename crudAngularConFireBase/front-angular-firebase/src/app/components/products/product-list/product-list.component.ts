import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList : Product[];
  constructor(private _productService : ProductService) { }

  ngOnInit() {
    return this._productService.getProducst()
      .snapshotChanges().subscribe(item => {
        this.productList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.productList.push(x as Product);
        });
    },error=>{
      console.log('error',error);
    });
  }

  eliminar($key:string){
    this._productService.deleteProduct($key);
  }

  editar(product: Product){
    // Object.assign({},product) se crea una copia del pobjeto
    this._productService.selectProduct = Object.assign({},product) ;
    this._productService.seleccionarProducto(Object.assign({},product));
  }
}
