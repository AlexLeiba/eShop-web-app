import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  categories: {
    type: Array,
  },
  size: {
    type: String,
  },
  color: {
    type: String,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('Product', ProductSchema);
