import mongoose from 'mongoose';

const customizationOptionSchema = new mongoose.Schema({
  key: String,
  label: String,
  type: { type: String, enum: ['text', 'image', 'select'] },
  options: [{ label: String, value: String, priceImpact: { type: Number, default: 0 } }],
  priceImpact: { type: Number, default: 0 },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    basePrice: { type: Number, required: true },
    images: [String],
    stock: { type: Number, default: 0 },
    customizationOptions: [customizationOptionSchema],
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
