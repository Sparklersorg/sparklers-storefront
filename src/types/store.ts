
export interface Product {
  id: string;
  name: string;
  price: number;
  buying_price?: number;
  imageUrl: string;
  unit: string;
  quantity: number;
  isBestSeller?: boolean;
}

export interface ProductCategory {
  heading: string;
  crackers: Product[];
}

export interface StoreDesign {
  percentage: number;
  primaryColor: string;
  secondaryColor: string;
  isOffer: boolean;
}
