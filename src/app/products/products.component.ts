import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products!: Array<Product>;
  errorMessage!: string;
  searchFormGroupe!: FormGroup;
  currentPage!: number;
  pageSize!: number;
  totalPages!: number;
  currentAction: boolean = true;

  constructor(private productService: ProductService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.currentPage = 0;
    this.pageSize = 5;
    this.searchFormGroupe = this.fb.group({
      keyword: this.fb.control(null)
    })
    this.initHandleGetPageProducts();
  }

  handleGetPageProducts(index: number, pageSize: number) {
    this.currentPage = index;
    this.currentAction === true ? this.initHandleGetPageProducts() : this.handleSearchProduct();

  }

  initHandleGetPageProducts() {
    this.productService.getPageProducts(this.currentPage, this.pageSize).subscribe(data => {
      this.products = data.products;
      this.totalPages = data.totalPages;
    }, (error: string) => {
      this.errorMessage = error;
    });
  }

  handleDeleteProduct(idProduct: any) {
    const confirmation = confirm("Ete vous sure de vouloir suprimer ? ");
    if (confirmation === false)
      return;
    this.productService.deleteProduct(idProduct)
      .subscribe(data => {
        this.products = this.products.filter(p => p.id !== idProduct);
      })
  }

  handleSetPromotion(idProduct: any) {
    this.productService.setPromotion(idProduct)
      .subscribe(data => {
        this.products = this.products.map(p => {
            if (p.id === idProduct) {
              p.promotion = !p.promotion
            }
            return {id: p.id, name: p.name, price: p.price, promotion: p.promotion};
          }
        )
      }, (error: string) => {
        this.errorMessage = error;
      });
  }

  handleSearchProduct() {
    this.currentAction = false;
    const keyword = this.searchFormGroupe.value.keyword;
    this.productService.searchProducts(keyword, this.currentPage, this.pageSize).subscribe(data => {
      this.products = data.products;
      this.totalPages = data.totalPages;
    })

  }
}
