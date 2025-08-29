import mongoose from "mongoose";

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
        discountPrice: {
          type: Number,
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
        roTitle: {
          type: String,
          required: true,
        },
        enTitle: {
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
        language: {
          type: String,
          default: "en",
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", CartSchema);
