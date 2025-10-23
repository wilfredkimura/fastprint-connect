import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  customizations: mongoose.Schema.Types.Mixed,
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [orderItemSchema],
    status: { type: String, enum: ['Pending', 'Processing', 'Completed', 'Ready for Pickup', 'Shipped', 'Cancelled'], default: 'Pending' },
    trackingNumber: String,
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
