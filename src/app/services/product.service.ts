import {Injectable} from '@angular/core';
// @ts-ignore
import {of, throwError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products!: Array<any>;

  constructor() {
    this.products = [
      {id: 1, name: 'Computer', price: 650},
      {id: 2, name: 'Priter', price: 1200},
      {id: 3, name: 'Smart phone', price: 130}]
  }

  public getAllProducts(): Observable<any> {
    return Math.random() > 0.5 ? throwError(() => new Error("Internet error!"))
      : of(this.products);
  }
}
