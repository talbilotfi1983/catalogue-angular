import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products!: Array<any>;
  errorMessage!: string;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data: any[]) => {
      this.products = data;
    }, (error: string) => {
      this.errorMessage = error;
    });
  }

  handleDeleteProduct(p: any) {
    //this.products = this.products.filter(p => p.id !== id)
    const i = this.products.indexOf(p);
    this.products.splice(i, 1);
  }

}
