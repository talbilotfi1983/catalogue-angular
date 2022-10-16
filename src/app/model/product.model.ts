export interface Product {
  id: string;
  name: string;
  price: number;
  promotion: boolean;
}

export interface PageProduct {
  products: Product[],
  numPage: number,
  size: number,
  totalPages: number
}
