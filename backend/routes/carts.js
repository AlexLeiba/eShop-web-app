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
  const queryLanguage = req.query.language;
  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const responseWithLocalization = cart.products.map((item) => {
      return {
        ...item._doc,
        title: queryLanguage === 'ro' ? item.roTitle : item.enTitle,
      };
    });

    res
      .status(200)
      .json({ data: { ...cart, products: responseWithLocalization } });
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
      // before check if added element exists in cart/ if exists update its quantity/ alse add new
      const updatedCart = await Cart.findOneAndUpdate(
        { userId: req.user.id },
        {
          $push: { products: { productId: queryProductId, ...req.body } },
        },
        {
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
            ...req.body,
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

// ADD NEW PRODUCT IN CART/ CREATE CART IF NOT EXISTS
router.put(
  '/cart/product-new/:productId',
  verifyTokenAuthorization,
  async (req, res) => {
    const productId = req.params.productId;

    try {
      if (!productId) {
        return res.status(400).json({ error: 'No product ID provided' });
      }

      const isCartExists = await Cart.findOne({ userId: req.user.id });

      if (!isCartExists) {
        // CREATE A NEW CART IF NOT EXISTS
        const newCartElemen = new Cart({
          userId: req.user.id,
          products: [
            {
              ...req.body,
            },
          ],
        });

        newCartElemen.save();
        res.status(201).json({ data: newCartElemen });
        return;
      }

      if (isCartExists) {
        // UPDATE CART IF EXISTS
        const isProductAlreadyInCart = await Cart.findOne({
          userId: req.user.id,
          products: {
            $elemMatch: {
              _id: productId,
              color: req.body.color,
              size: req.body.size,
            },
          },
        }).lean();

        if (!isProductAlreadyInCart) {
          // PRODUCT IS NOT N CART
          const updatedCart = await Cart.findOneAndUpdate(
            { userId: req.user.id },
            {
              $push: { products: { ...req.body } },
            },

            {
              new: true,
            }
          );
          res.status(201).json({ data: updatedCart });
          return;
        }

        if (isProductAlreadyInCart) {
          // IF PRODUCT EXISTS IN CART UPDATE ONLY QUANTITY

          const updatedCart = await Cart.findOneAndUpdate(
            {
              userId: req.user.id,
              'products._id': productId,
              'products.color': req.body.color,
              'products.size': req.body.size,
            },
            {
              $inc: {
                //$inc will add body value to the prev one
                'products.$[elem].quantity': req.body.quantity,
              },
            },
            {
              new: true,
              arrayFilters: [{ 'elem._id': productId }],
            }
          );

          res.status(201).json({ data: updatedCart });
          return;
        }
      }
    } catch (error) {
      res.status(400).json({ Error: error.message });
    }
  }
);

// UPDATE CART ELEMENT QUANTITY
router.put(
  '/cart/product-quantity/:productId/:quantity/:size/:color',
  verifyTokenAuthorization,
  async (req, res) => {
    const paramProductId = req.params.productId;
    const paramQuantity = req.params.quantity;
    const paramSize = req.params.size;
    const paramColor = req.params.color;

    if (!paramProductId) {
      return res.status(400).json({ error: 'No cart element ID provided' });
    }
    try {
      const findCart = await Cart.findOne({ userId: req.user.id }); //check if cart exists
      if (!findCart) {
        return res.status(404).json({ error: 'Cart not found' });
      }

      if (findCart) {
        // before check if added element exists in cart/ if exists update its quantity/ alse add new
        const updatedCart = await Cart.findOneAndUpdate(
          {
            userId: req.user.id,
            'products._id': paramProductId,
            'products.color': paramColor,
            'products.size': paramSize,
          },
          {
            $inc: {
              'products.$[elem].quantity': paramQuantity,
            },
          },
          {
            new: true,
            arrayFilters: [
              {
                'elem._id': paramProductId,
                'elem.color': paramColor,
                'elem.size': paramSize,
              },
            ],
          }
        );

        return res.status(201).json({ data: updatedCart });
      }
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }
);

// DELETE CART ELEMENT
router.put(
  '/cart/product-delete/:productId/:color/:size',
  verifyTokenAuthorization,
  async (req, res) => {
    const queryProductIdToRemove = req.params.productId;
    const paramSize = req.params.size;
    const paramColor = req.params.color;
    try {
      if (!queryProductIdToRemove) {
        return res.status(400).json({ error: 'No product ID provided' });
      }

      if (queryProductIdToRemove) {
        const deletedCartElement = await Cart.findOneAndUpdate(
          {
            userId: req.user.id,
          },
          {
            $pull: {
              products: {
                _id: queryProductIdToRemove,
                color: paramColor,
                size: paramSize,
              },
            },
          },
          { new: true } // return the updated document
        );

        if (!deletedCartElement) {
          return res.status(404).json({ error: 'Cart element not found' });
        }

        const allProducts = await Cart.find({ userId: req.user.id });

        if (!allProducts) {
          return res.status(404).json({ error: 'Cart not found' });
        }

        res.status(200).json({
          data: allProducts,
        });
      }
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }
);

// DELETE ALL ELEMENTS FROM CART
router.delete('/cart', verifyTokenAuthorization, async (req, res) => {
  const userId = req.user.id;
  const cart = await Cart.findOneAndDelete({ userId });
  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  res.status(200).json({ data: cart });

  try {
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
