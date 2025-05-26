import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    stripeId: {
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
          required: true,
        },
        color: {
          type: String,
          required: true,
        },
        title: {
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
        totalPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Order', OrderSchema);
