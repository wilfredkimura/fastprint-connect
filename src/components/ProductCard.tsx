import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const categoryLabels: Record<string, string> = {
    frames: "Decor & Frames",
    apparel: "Apparel",
    mugs: "Mugs & Tumblers",
    gifts: "Branded Gifts",
    christian: "Christian Designs",
  };

  return (
    <Card className="overflow-hidden hover:shadow-elegant transition-all duration-300 group">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {categoryLabels[product.category]}
          </Badge>
          {product.isFeatured && (
            <Badge className="text-xs bg-primary">Featured</Badge>
          )}
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="font-heading font-semibold text-lg mb-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">
            KSh {product.basePrice.toLocaleString()}
          </span>
          {product.stockQuantity < 10 && (
            <Badge variant="destructive" className="text-xs">
              Low Stock
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Link to={`/product/${product.id}`} className="w-full">
          <Button className="w-full gap-2">
            <ShoppingCart className="h-4 w-4" />
            Customize & Add
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
