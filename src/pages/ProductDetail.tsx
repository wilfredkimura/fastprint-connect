import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { mockProducts } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeft, ShoppingCart, Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const ProductDetail = () => {
  const { id } = useParams();
  const product = mockProducts.find(p => p.id === id);
  const { addToCart } = useCart();
  const [customizations, setCustomizations] = useState<Record<string, string | File>>({});
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleCustomizationChange = (optionId: string, value: string | File) => {
    setCustomizations(prev => ({ ...prev, [optionId]: value }));
  };

  const handleFileUpload = (optionId: string, file: File | null) => {
    if (file) {
      setCustomizations(prev => ({ ...prev, [optionId]: file }));
    }
  };

  const calculateTotalPrice = () => {
    let total = product.basePrice;
    product.customizationOptions?.forEach(option => {
      if (customizations[option.id] && option.priceImpact) {
        total += option.priceImpact;
      }
    });
    return total * quantity;
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, customizations);
    }
  };

  const isValidCustomization = () => {
    return product.customizationOptions?.every(option => {
      if (option.required) {
        return !!customizations[option.id];
      }
      return true;
    }) ?? true;
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <Link to="/products">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {product.description}
              </p>
              <div className="text-3xl font-bold mb-6">
                KSh {product.basePrice.toLocaleString()}
                {calculateTotalPrice() > product.basePrice && (
                  <span className="text-lg text-muted-foreground ml-2">
                    (Total: KSh {calculateTotalPrice().toLocaleString()})
                  </span>
                )}
              </div>
            </div>

            {product.customizationOptions && product.customizationOptions.length > 0 && (
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <h2 className="font-heading font-semibold text-lg mb-4">
                    Customize Your Product
                  </h2>

                  {product.customizationOptions.map(option => (
                    <div key={option.id} className="space-y-2">
                      <Label htmlFor={option.id}>
                        {option.label}
                        {option.required && <span className="text-destructive ml-1">*</span>}
                        {option.priceImpact && option.priceImpact > 0 && (
                          <span className="text-sm text-muted-foreground ml-2">
                            (+KSh {option.priceImpact})
                          </span>
                        )}
                      </Label>

                      {option.type === "text" && (
                        <Input
                          id={option.id}
                          placeholder={`Enter ${option.label.toLowerCase()}`}
                          value={(customizations[option.id] as string) || ""}
                          onChange={(e) => handleCustomizationChange(option.id, e.target.value)}
                        />
                      )}

                      {option.type === "select" && option.options && (
                        <Select
                          value={(customizations[option.id] as string) || ""}
                          onValueChange={(value) => handleCustomizationChange(option.id, value)}
                        >
                          <SelectTrigger id={option.id}>
                            <SelectValue placeholder={`Select ${option.label.toLowerCase()}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {option.options.map(opt => (
                              <SelectItem key={opt} value={opt}>
                                {opt}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}

                      {option.type === "image" && (
                        <div className="flex items-center gap-2">
                          <Input
                            id={option.id}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(option.id, e.target.files?.[0] || null)}
                            className="hidden"
                          />
                          <Label
                            htmlFor={option.id}
                            className="flex-1 cursor-pointer"
                          >
                            <div className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-muted transition-colors">
                              <Upload className="h-4 w-4" />
                              <span className="text-sm">
                                {customizations[option.id]
                                  ? (customizations[option.id] as File).name
                                  : "Choose file"}
                              </span>
                            </div>
                          </Label>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Label htmlFor="quantity">Quantity:</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                  >
                    +
                  </Button>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full gap-2"
                onClick={handleAddToCart}
                disabled={!isValidCustomization()}
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart - KSh {calculateTotalPrice().toLocaleString()}
              </Button>

              {!isValidCustomization() && (
                <p className="text-sm text-destructive">
                  Please complete all required customization options
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
