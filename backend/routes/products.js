import express from "express";
import {
  verifyTokenAuthorizationAndAdmin,
  verifyTokenAuthorization,
} from "../config/verifyToken.js";
import Product from "../models/Product.js";
import { v4 as uuidv4 } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import { ALLOWED_FORMATS } from "../config/cloudinary.js";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// GET ALL PUBLISHED PRODUCTS
router.get("/products", async (req, res) => {
  const queryLanguage = req.query.language; //TODO: ADD THIS: verifyTokenAuthorization
  const queryNew = req.query.sort || req.query["?sort"] === "newest";
  const queryCategory = req.query.category;
  const querySize = req.query.size;
  const queryColor = req.query.color;

  const queryPage = req.query.page || 1;

  // Pagination
  const limitPerPage = 12; // Number of products per page
  const skipProducts = (queryPage - 1) * limitPerPage; // Calculate the number of products to skip

  const queryLimit = req.query.limit || limitPerPage; // Default limit is 12

  // Filter object
  const filter = {};
  if (queryCategory) {
    filter.categories = queryCategory; // Will match: { color: 'red' }
  }
  if (querySize) {
    filter.size = querySize; // Will match: { size: 'M' }
  }
  if (queryColor) {
    filter.color = queryColor; // Will match: { categories: 't-shirt' }
  }

  try {
    const allProducts = await Product.find({
      isPublished: true,
      ...filter,
    }); //Returns all products count filtered except pagination limits

    const filteredProducts = await Product.find({
      isPublished: true,
      ...filter,
    })
      .sort(queryNew ? { createdAt: -1 } : { createdAt: 1 })
      .limit(queryLimit)
      .skip(skipProducts);

    if (!filteredProducts) {
      return res.status(404).json({ error: "No products found" });
    }

    const responseWithLocalization = filteredProducts.map((item) => {
      return {
        _id: item._id,
        discountPrice: item.discountPrice,
        price: item.price,
        image: item.image,
        ratings: item.ratings,
        title: queryLanguage === "ro" ? item.roTitle : item.enTitle,
        description:
          queryLanguage === "ro" ? item.roDescription : item.enDescription,
        color: item.color,
        size: item.size,
        categories: item.categories,
        roTitle: item.roTitle,
        enTitle: item.enTitle,
        roDescription: item.roDescription,
        enDescription: item.enDescription,
      };
    });

    res
      .status(200)
      .json({ data: responseWithLocalization, count: allProducts.length });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

// GET 5 FOUND PUBLISHED PRODUCTS IN SEARCH
router.get("/search-products", async (req, res) => {
  const queryLanguage = req.query.language;
  const searchTerm = req.query.search;

  if (!searchTerm) return;
  try {
    const response = await Product.find({
      isPublished: true,
      title: { $regex: searchTerm, $options: "i" },
    })
      .limit(5)
      .sort({ createdAt: -1 });

    if (!response) {
      return res.status(404).json({ error: "No products found" });
    }

    const responseWithLocalization = response.map((item) => {
      return {
        _id: item._id,
        title: queryLanguage === "ro" ? item.roTitle : item.enTitle,
        image: item.image,
      };
    });

    res.status(200).json({ data: responseWithLocalization });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

//GET SINGLE PRODUCT
router.get("/products/:productId", async (req, res) => {
  const productId = req.params.productId;
  const queryLanguage = req.query.language;
  try {
    const product = await Product.findOne({
      _id: productId,
      isPublished: true,
    });
    if (!product) {
      return res.status(404).json({ error: "No product was found" });
    }
    res.status(200).json({
      data: {
        ...product._doc,
        title:
          queryLanguage === "ro" ? product._doc.roTitle : product._doc.enTitle,
        description:
          queryLanguage === "ro"
            ? product._doc.roDescription
            : product._doc.enDescription,
        moreInfo:
          queryLanguage === "ro"
            ? product._doc.roMoreInfo
            : product._doc.enMoreInfo,
      },
    });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

// GET FEATURED PRODUCTS

router.get("/featured-products", async (req, res) => {
  const queryLanguage = req.query.language || "en"; //TODO: ADD THIS: verifyTokenAuthorization

  try {
    const response = await Product.find({
      isPublished: true,
      featured: true,
      // language: queryLanguage,
    })
      .limit(5)
      .sort({ createdAt: -1 });

    if (!response) {
      return res.status(404).json({ error: "No products found" });
    }

    const responseWithLocalization = response.map((item) => {
      return {
        _id: item._id,
        title: queryLanguage === "ro" ? item.roTitle : item.enTitle,
        description:
          queryLanguage === "ro" ? item.roDescription : item.enDescription,
        image: item.image,
        featuredBackgroundColor: item.featuredBackgroundColor,
        price: item.price,
        discountPrice: item.discountPrice,
      };
    });

    res.status(200).json({ data: responseWithLocalization });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

router.post("/rate-product", verifyTokenAuthorization, async (req, res) => {
  const userId = req.user.id;
  const productId = req.body.productId;
  const rating = req.body.rating;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "No product was found" });
    }

    let response = await Product.findOneAndUpdate(
      { _id: productId, "ratings.userId": userId },
      { $set: { "ratings.$.rating": rating } },
      { new: true }
    );

    if (!response) {
      // User hasn't rated yet → push new rating
      response = await Product.findOneAndUpdate(
        { _id: productId },
        { $push: { ratings: { userId, rating } } },
        { new: true }
      );
      if (!response) {
        return res
          .status(404)
          .json({ error: "Something went wrong while adding a rate" });
      }
    }
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});
router.post(
  "/add-product-review",
  verifyTokenAuthorization,
  async (req, res) => {
    const userId = req.user.id;
    const productId = req.body.productId;
    const review = req.body.review;
    const rating = req.body.rating;
    const userName = req.body.userName;
    const now = Date.now();

    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "No product was found" });
      }

      let response = await Product.findOneAndUpdate(
        { _id: productId, userId },
        {
          $set: {
            reviews: { userId, review, userName, rating, createdAt: now },
          },
        },
        { new: true }
      );

      // User hasn't rated yet → push new rating
      response = await Product.findOneAndUpdate(
        { _id: productId },
        {
          $push: {
            reviews: { userId, review, userName, rating, createdAt: now },
          },
        },
        { new: true }
      );
      if (!response) {
        return res
          .status(404)
          .json({ error: "Something went wrong while adding a review" });
      }

      res.status(200).json({ data: response });
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }
);

// ADMIN///////////////////////////////////////////////

//GET SINGLE PRODUCT (ONLY ADMIN)
router.get(
  "/admin/product/:productId",
  verifyTokenAuthorizationAndAdmin,
  async (req, res) => {
    const productId = req.params.productId;
    const queryLanguage = req.query.language;

    try {
      const product = await Product.findOne({
        _id: productId,
      });
      if (!product) {
        return res.status(404).json({ error: "No product was found" });
      }
      res.status(200).json({
        data: {
          ...product._doc,
          title:
            queryLanguage === "ro"
              ? product._doc.roTitle
              : product._doc.enTitle,
          description:
            queryLanguage === "ro"
              ? product._doc.roDescription
              : product._doc.enDescription,
          moreInfo:
            queryLanguage === "ro"
              ? product._doc.roMoreInfo
              : product._doc.enMoreInfo,
        },
      });
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }
);

//GET ALL PRODUCTS (ONLY ADMIN)
router.get(
  "/admin/products",
  verifyTokenAuthorizationAndAdmin,
  async (req, res) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 }); // sort by createdAt in descending order
      if (!products) {
        return res.status(404).json({ error: "No products found" });
      }
      res.status(200).json({ data: products });
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }
);

// ADD PRODUCT (ONLY ADMIN)
router.post(
  "/admin/product",
  verifyTokenAuthorizationAndAdmin,
  async (req, res) => {
    const bodyImages = req.body.images;
    const bodyCoverImage = req.body.image;

    let uploadedCoverImage = { image: "", imageId: "" };
    let uploadedImages = [];

    try {
      if (bodyCoverImage) {
        const storedImage = await cloudinary.uploader.upload(bodyCoverImage, {
          folder: "eshop",
          allowed_formats: ALLOWED_FORMATS,
          transformation: [
            {
              crop: "limit",
            },
          ],
        });
        if (storedImage.error) {
          return res.status(400).json({ error: storedImage.error.message });
        }
        uploadedCoverImage = {
          image: storedImage.secure_url,
          imageId: storedImage.public_id,
        };
      }

      if (bodyImages) {
        // for (let i = 0; i < bodyImages.length; i++) {
        const uploaded = bodyImages.map(async (item, index) => {
          const storedImage = await cloudinary.uploader.upload(item.image, {
            folder: "eshop",
            allowed_formats: ALLOWED_FORMATS,
            transformation: [
              {
                crop: "limit",
              },
            ],
          });
          if (storedImage.error) {
            return res.status(400).json({ error: storedImage.error.message });
          }
          return {
            colorName: item.colorName,
            image: storedImage.secure_url,
            imageId: storedImage.public_id,
          };
        });

        uploadedImages = await Promise.all(uploaded);
      }

      const uniqueId = uuidv4();
      const newProduct = new Product({
        ...req.body,
        image: uploadedCoverImage.image,
        imageId: uploadedCoverImage.imageId,
        images: uploadedImages,
        id: uniqueId,
      });

      newProduct.save();

      res.status(201).json({ data: { ...newProduct } });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

// UPDATE PRODUCT (ONLY ADMIN)
router.put(
  "/admin/product/:id",
  verifyTokenAuthorizationAndAdmin,
  async (req, res) => {
    const bodyImages = req.body.images;
    const bodyCoverImage = req.body.image;

    try {
      const productID = req.params.id;

      if (!productID) {
        return res.status(400).json({ error: "No product ID provided" });
      }

      if (bodyCoverImage) {
        // IF IMAGE IS PROVIDED IN BODY ( add it to body obj before saving it in DB)
        const storedImage = await cloudinary.uploader.upload(bodyCoverImage, {
          folder: "eshop",
          allowed_formats: ALLOWED_FORMATS,
          transformation: [
            {
              crop: "limit",
              width: 1000,
              height: 800,
            },
          ],
        });
        if (storedImage.error) {
          return res.status(400).json({ error: storedImage.error.message });
        }
        req.body.image = storedImage.secure_url;
        req.body.imageId = storedImage.public_id;
      }

      if (bodyImages) {
        const uploaded = bodyImages.map(async (item, index) => {
          const storedImage = await cloudinary.uploader.upload(item.image, {
            folder: "eshop",
            allowed_formats: ALLOWED_FORMATS,
            transformation: [
              {
                crop: "limit",
              },
            ],
          });
          if (storedImage.error) {
            return res.status(400).json({ error: storedImage.error.message });
          }
          return {
            colorName: item.colorName,
            image: storedImage.secure_url,
            imageId: storedImage.public_id,
          };
        });

        req.body.images = await Promise.all(uploaded);
      }

      if (productID) {
        const updatedProduct = await Product.findByIdAndUpdate(
          productID,
          {
            $set: req.body,
          },
          { new: true, runValidators: true }
        );

        if (!updatedProduct) {
          return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ data: updatedProduct });
      }
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }
);

// DELETE PRODUCT (ONLY ADMIN)
router.delete(
  "/admin/product/:id",
  verifyTokenAuthorizationAndAdmin,
  async (req, res) => {
    try {
      const productID = req.params.id;

      if (!productID) {
        return res.status(400).json({ error: "No product ID provided" });
      }

      if (productID) {
        const deletedProduct = await Product.findByIdAndDelete(productID);

        if (!deletedProduct) {
          return res.status(404).json({ error: "Product not found" });
        }

        // DELETE IMAGES
        if (deletedProduct.imageId) {
          await cloudinary.uploader.destroy(deletedProduct.imageId);
        }
        if (deletedProduct.images) {
          deletedProduct.images.forEach(async (item) => {
            if (item.imageId) {
              await cloudinary.uploader.destroy(item.imageId);
            }
          });
        }

        res
          .status(200)
          .json({ data: { message: "Product deleted successfully" } });
      }
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }
);
// DELETE MULTIPLE PRODUCTS (ONLY ADMIN)
router.delete(
  "/admin/products",
  verifyTokenAuthorizationAndAdmin,
  async (req, res) => {
    try {
      const productsIds = req.body.productIds;

      if (!productsIds) {
        return res.status(400).json({ error: "No product Ids provided" });
      }

      if (productsIds) {
        const allProducts = await Product.find({ id: { $in: productsIds } });

        if (!allProducts) {
          return res.status(404).json({ error: "Product not found" });
        }
        // DELETE IMAGES OF EACH PRODUCT
        allProducts.forEach(async (item) => {
          if (item.imageId) {
            await cloudinary.uploader.destroy(item.imageId);
          }
          if (item.images) {
            item.images.forEach(async (item) => {
              if (item.imageId) {
                await cloudinary.uploader.destroy(item.imageId);
              }
            });
          }
        });

        const deletedProduct = await Product.deleteMany({
          id: { $in: productsIds },
        });

        if (!deletedProduct) {
          return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({
          data: { message: "The products were deleted successfully" },
        });
      }
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }
);

export default router;
