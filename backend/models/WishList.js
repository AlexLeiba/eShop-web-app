import mongoose from "mongoose";

const WishListSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    discountPrice: {
      type: Number,
    },
    userId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    roTitle: {
      type: String,
    },
    enTitle: {
      type: String,
    },
    roDescription: {
      type: String,
    },
    enDescription: {
      type: String,
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
      type: Array,
    },
    color: {
      type: Array,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    featuredBackgroundColor: {
      type: String,
      default: "#fff",
    },
    language: {
      type: String,
      default: "en",
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("WishList", WishListSchema);
