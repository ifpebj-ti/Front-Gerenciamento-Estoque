export type ProductType = {
  id: number;
  title: string;
  image: string;
  unit_price: string;
  stock_value: string;
  quantity: number;
  categories: string[];
  criticalQuantityStock: number;
  description: string;
};

export interface Product {
  id: number;
  name: string;
  quantity: number;
  photo: File | null;
  critical_quantity: number;
  unitValue: number;
  stockValue: number;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface ProductDataResponse {
  content: Product[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
