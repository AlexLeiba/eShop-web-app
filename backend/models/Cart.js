import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        size: {
          type: String,
        },
        color: {
          type: String,
        },
        title: {
          type: String,
        },
        price: {
          type: Number,
        },

        image: {
          type: String,
        },
        language: {
          type: String,
          default: 'en',
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Cart', CartSchema);
