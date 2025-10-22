export type ProductCategory = 
  | "frames"
  | "apparel"
  | "mugs"
  | "gifts"
  | "christian";

export interface CustomizationOption {
  id: string;
  type: "text" | "image" | "select";
  label: string;
  required?: boolean;
  options?: string[];
  priceImpact?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  category: ProductCategory;
  images: string[];
  customizationOptions?: CustomizationOption[];
  stockQuantity: number;
  isFeatured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  customizations?: Record<string, string | File>;
  totalPrice: number;
}
