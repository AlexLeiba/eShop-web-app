import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    discountPrice: {
      type: Number,
    },
    ratings: [
      {
        userId: {
          type: String,
        },
        rating: {
          type: Number,
        },
      },
    ],
    reviews: [
      {
        userId: {
          type: String,
        },
        review: {
          type: String,
        },
        userName: {
          type: String,
        },
        rating: {
          type: Number,
        },
        createdAt: {
          type: Number,
        },
      },
    ],
    enMoreInfo: {
      type: String,
    },
    roMoreInfo: {
      type: String,
    },
    moreInfo: {
      type: String,
    },
    roTitle: {
      type: String,
      required: true,
    },
    enTitle: {
      type: String,
      required: true,
    },
    roDescription: {
      type: String,
      required: true,
    },
    enDescription: {
      type: String,
      required: true,
    },
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
    imageId: {
      type: String,
    },
    images: {
      type: Array,
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
    imageColor: {
      type: String,
      default: "white",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", ProductSchema);
