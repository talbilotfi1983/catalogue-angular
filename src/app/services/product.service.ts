import {Injectable} from '@angular/core';
// @ts-ignore
import {of, throwError, Observable} from "rxjs";
import {PageProduct, Product} from "../model/product.model";
import {UUID} from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products!: Array<Product>;

  constructor() {
    this.products = new Array<Product>;
    ['Computer', 'Priter', 'Smart phone'].map(produitName => {
      for (let i = 1; i <= 10; i++) {
        this.products.push({
          name: produitName + ' ' + i,
          id: UUID.UUID(),
          price: Math.random() * 10000,
          promotion: Math.random() > 0.9 ? true : false
        })
      }
    })
  }

  public getAllProducts(): Observable<Product[]> {
    return Math.random() > 0.9 ? throwError(() => new Error("Internet error!"))
      : of(this.products);
  }

  public getPageProducts(page_: number, size_: number): Observable<PageProduct> {
    const totalPages_ = Math.ceil(this.products.length / size_);
    const index = page_ * size_;
    const products_ = this.products.slice(index, index + size_);
    return of({numPage: page_, size: size_, products: products_, totalPages: totalPages_})
  }

  deleteProduct(idProduct: string): Observable<boolean> {
    this.products = this.products.filter(p => p.id !== idProduct);
    return of(true);
  }

  setPromotion(idProduct: string): Observable<boolean> {
    let isProduct = false;
    this.products = this.products.map(p => {
        if (p.id === idProduct) {
          p.promotion = !p.promotion
          isProduct = true;
        }
        return {id: p.id, name: p.name, price: p.price, promotion: p.promotion};
      }
    )
    return isProduct ?
      of(true) :
      throwError(() => new Error("Product %d not found"))
  }

  searchProducts(keyword: string, page_: number, size_: number): Observable<PageProduct> {
    const products = this.products.filter(p => p.name.includes(keyword));
    const totalPages_ = Math.ceil(products.length / size_);
    const index = page_ * size_;
    const products_ = products.slice(index, index + size_);
    return of({numPage: page_, size: size_, products: products_, totalPages: totalPages_})
  }
}
