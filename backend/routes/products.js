import express from 'express';
import { verifyTokenAuthorizationAndAdmin } from '../config/verifyToken.js';
import Product from '../models/Product.js';

import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// GET ALL PUBLISHED PRODUCTS
router.get('/products', async (req, res) => {
  const queryNew = req.query.new;
  const queryCategory = req.query.category;
  try {
    let filteredProducts;
    if (queryNew) {
      filteredProducts = await Product.find({
        isPublished: true,
      }).sort({ createdAt: -1 });
    } else if (queryCategory) {
      filteredProducts = await Product.find({
        categories: {
          $in: [queryCategory], //will fetch only products with category that matches the query
        },
        isPublished: true,
      })
        .sort({ createdAt: -1 })
        .limit(5);
    } else {
      filteredProducts = await Product.find({ isPublished: true });
    }

    if (!filteredProducts) {
      return res.status(404).json({ error: 'No products found' });
    }

    res.status(200).json({ data: filteredProducts });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

//GET ALL PRODUCTS (ONLY ADMIN)
router.get(
  '/all-products',
  verifyTokenAuthorizationAndAdmin,
  async (req, res) => {
    try {
      const products = await Product.find();
      if (!products) {
        return res.status(404).json({ error: 'No products found' });
      }
      res.status(200).json({ data: products });
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }
);

// ADD PRODUCT (ONLY ADMIN)
router.post('/product', verifyTokenAuthorizationAndAdmin, async (req, res) => {
  try {
    const newProduct = new Product(req.body);

    newProduct.save();

    res.status(201).json({ data: newProduct });
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE PRODUCT (ONLY ADMIN)
router.put(
  '/product/:id',
  verifyTokenAuthorizationAndAdmin,
  async (req, res) => {
    try {
      const productID = req.params.id;

      if (!productID) {
        return res.status(400).json({ error: 'No product ID provided' });
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
          return res.status(404).json({ error: 'Product not found' });
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
  '/product/:id',
  verifyTokenAuthorizationAndAdmin,
  async (req, res) => {
    try {
      const productID = req.params.id;

      if (!productID) {
        return res.status(400).json({ error: 'No product ID provided' });
      }

      if (productID) {
        const deletedProduct = await Product.findByIdAndDelete(productID);

        if (!deletedProduct) {
          return res.status(404).json({ error: 'Product not found' });
        }

        res
          .status(200)
          .json({ data: { message: 'Product deleted successfully' } });
      }
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }
);

export default router;
