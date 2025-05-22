export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  images: string[];
  description: string;
  category: string;
  color: string;
  size?: string;
  material?: string;
  url: string;
}