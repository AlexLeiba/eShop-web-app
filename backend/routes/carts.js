import express from 'express';
import {
  verifyTokenAuthorization,
  verifyTokenAuthorizationAndAdmin,
} from '../config/verifyToken.js';
import Cart from '../models/Cart.js';

import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// GET CART
router.get('/cart', verifyTokenAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({ error: 'No cart found' });
    }

    res.status(200).json({ data: cart });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

// GET ALL CARTS (ONLY ADMIN)
router.get('/carts', verifyTokenAuthorizationAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    if (!carts) {
      return res.status(404).json({ error: 'No carts found' });
    }

    res.status(200).json({ data: carts });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

// UPDATE QUANTITY DATA OF CART PRODUCT ELEMENT /CREATE CART ELEMENT
router.put('/cart/:productId', verifyTokenAuthorization, async (req, res) => {
  const queryProductId = req.params.productId;

  if (!queryProductId) {
    return res.status(400).json({ error: 'No cart element ID provided' });
  }
  try {
    const findCart = await Cart.findOne({ userId: req.user.id }); //check if cart exists

    if (findCart) {
      // UPDATE IF CART EXISTS
      const updatedCart = await Cart.findOneAndUpdate(
        { userId: req.user.id },
        {
          $set: { 'products.$[elem].quantity': req.body.quantity },
        },
        {
          arrayFilters: [{ 'elem.productId': queryProductId }],
          new: true,
        }
      );

      res.status(201).json({ data: updatedCart });
    } else {
      // CREATE NEW CART IF NOT EXISTS
      const newCartElemen = new Cart({
        userId: req.user.id,
        products: [
          {
            productId: queryProductId,
            quantity: req.body.quantity || 1,
            size: req.body.size || '', //if not changed will be taken from first product size
            color: req.body.color || '', //if not changed will be taken from first product color
          },
        ],
      });

      newCartElemen.save();
      res.status(201).json({ data: newCartElemen });
    }
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

// ADD NEW PRODUCT IN EXISTING CART
router.put(
  '/cart/product-new/:productId',
  verifyTokenAuthorization,
  async (req, res) => {
    const queryProductId = req.params.productId;

    try {
      if (!queryProductId) {
        return res.status(400).json({ error: 'No product ID provided' });
      }

      if (queryProductId) {
        const updatedCart = await Cart.findOneAndUpdate(
          { userId: req.user.id },
          {
            $push: { products: { productId: queryProductId, quantity: 1 } },
          },
          {
            new: true,
          }
        );

        res.status(201).json({ data: updatedCart });
      }
    } catch (error) {
      res.status(400).json({ Error: error.message });
    }
  }
);

// DELETE CART ELEMENT
router.put(
  '/cart/product-delete/:productId',
  verifyTokenAuthorization,
  async (req, res) => {
    const queryProductIdToRemove = req.params.productId;
    try {
      if (!queryProductIdToRemove) {
        return res.status(400).json({ error: 'No product ID provided' });
      }

      if (queryProductIdToRemove) {
        const deletedCartElement = await Cart.findOneAndUpdate(
          { userId: req.user.id },
          {
            $pull: {
              products: { productId: queryProductIdToRemove },
            },
          },
          { new: true } // return the updated document
        );

        if (!deletedCartElement) {
          return res.status(404).json({ error: 'Cart element not found' });
        }

        res.status(200).json({
          data: {
            message: 'Cart element deleted successfully',
            data: deletedCartElement,
          },
        });
      }
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }
);

export default router;
