import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Trash2, Plus, Minus, MessageCircle } from "lucide-react";
import { sendWhatsAppOrder } from "@/lib/whatsappUtils";
import { toast } from "@/hooks/use-toast";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, getShippingFee, getGrandTotal } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const handleWhatsAppOrder = () => {
    if (!customerName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to proceed",
        variant: "destructive",
      });
      return;
    }

    if (!customerPhone.trim()) {
      toast({
        title: "Phone required",
        description: "Please enter your phone number to proceed",
        variant: "destructive",
      });
      return;
    }

    sendWhatsAppOrder({
      customerName,
      customerPhone,
      items,
      subtotal: getCartTotal(),
      shippingFee: getShippingFee(),
      total: getGrandTotal(),
    });

    toast({
      title: "Redirecting to WhatsApp",
      description: "Your order details have been prepared. Please send the message to complete your order.",
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-heading font-bold">Your cart is empty</h1>
          <p className="text-muted-foreground">Start shopping to add items to your cart</p>
          <Link to="/products">
            <Button size="lg">Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <Link to="/products">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Button>
        </Link>

        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-2">
                      <h3 className="font-heading font-semibold text-lg">{item.name}</h3>
                      
                      {item.customizations && Object.keys(item.customizations).length > 0 && (
                        <div className="text-sm text-muted-foreground">
                          <p className="font-medium">Customizations:</p>
                          {Object.entries(item.customizations).map(([key, value]) => (
                            <p key={key}>
                              • {key}: {value instanceof File ? value.name : value}
                            </p>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-12 text-center font-semibold">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="font-bold">KSh {item.totalPrice.toLocaleString()}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive gap-1"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h2 className="font-heading font-semibold text-xl mb-4">Order Summary</h2>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>KSh {getCartTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span className={getShippingFee() === 0 ? "text-accent font-semibold" : ""}>
                        {getShippingFee() === 0 ? "FREE" : `KSh ${getShippingFee().toLocaleString()}`}
                      </span>
                    </div>
                    {getShippingFee() > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Free shipping on orders over KSh 5,000
                      </p>
                    )}
                  </div>

                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>KSh {getGrandTotal().toLocaleString()}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-heading font-semibold">Your Details</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="0700 000 000"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full gap-2 shadow-elegant"
                  onClick={handleWhatsAppOrder}
                >
                  <MessageCircle className="h-5 w-5" />
                  Order via WhatsApp
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  You'll be redirected to WhatsApp to complete your order with M-Pesa payment
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
