import { CartItem } from "@/types/product";

interface OrderDetails {
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
}

export const generateWhatsAppMessage = (order: OrderDetails): string => {
  let message = `*🛍️ New Order from FASTPRINTKE Website*\n\n`;
  message += `*Customer Details:*\n`;
  message += `Name: ${order.customerName}\n`;
  message += `Phone: ${order.customerPhone}\n\n`;
  
  message += `*Order Items:*\n`;
  message += `━━━━━━━━━━━━━━━━\n\n`;
  
  order.items.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`;
    message += `   Quantity: ${item.quantity}\n`;
    message += `   Unit Price: KSh ${(item.totalPrice / item.quantity).toLocaleString()}\n`;
    
    if (item.customizations) {
      message += `   Customizations:\n`;
      Object.entries(item.customizations).forEach(([key, value]) => {
        if (value instanceof File) {
          message += `   - ${key}: ${value.name}\n`;
        } else {
          message += `   - ${key}: ${value}\n`;
        }
      });
    }
    
    message += `   Total: KSh ${item.totalPrice.toLocaleString()}\n\n`;
  });
  
  message += `━━━━━━━━━━━━━━━━\n`;
  message += `*Subtotal:* KSh ${order.subtotal.toLocaleString()}\n`;
  message += `*Shipping Fee:* ${order.shippingFee === 0 ? 'FREE' : `KSh ${order.shippingFee.toLocaleString()}`}\n`;
  message += `*TOTAL:* KSh ${order.total.toLocaleString()}\n\n`;
  message += `_Please confirm this order and we'll process it right away!_`;
  
  return message;
};

export const sendWhatsAppOrder = (order: OrderDetails, businessNumber: string = "254721248369") => {
  const message = generateWhatsAppMessage(order);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};
