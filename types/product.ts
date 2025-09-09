export interface Option {
  uid: string;
  skuCode: string;
  displayName: string;
  price: number;
}

export interface ProductOptionType {
  optionTypeId: number;
  displayName: string;
  options: Option[];
}

export interface Product {
  uid: string;
  name: string;
  slug: string;
  description: string;
}

export interface ProductData {
  product: Product;
  optionTypes: ProductOptionType[];
}
