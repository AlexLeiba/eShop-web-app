import express from 'express';
import {
  verifyTokenAuthorization,
  verifyTokenAuthorizationAndAdmin,
} from '../config/verifyToken.js';
import WishList from '../models/WishList.js';
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();

// GET WISHLIST
router.get('/wish-list', verifyTokenAuthorization, async (req, res) => {
  try {
    const wishList = await WishList.find({ userId: req.user.id });
    if (!wishList) {
      return res.status(404).json({ error: 'No wish list found' });
    }

    res.status(200).json({ data: wishList });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

router.put(
  '/wish-list/:productId',
  verifyTokenAuthorization,
  async (req, res) => {
    const productId = req.params.productId;
    try {
      const isProductExistsInWishList = await WishList.findOne({
        userId: req.user.id,
        productId: productId,
      }); //check if wishlist exists

      if (isProductExistsInWishList) {
        return res
          .status(400)
          .json({ error: 'The product already exists in the list' });
      }
      const newProductInWishList = new WishList({
        userId: req.user.id,
        productId: productId,
        ...req.body,
      });

      newProductInWishList.save();
      res.status(201).json({ data: newProductInWishList });
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }
);

router.delete(
  '/wish-list/:productId',
  verifyTokenAuthorization,
  async (req, res) => {
    const productId = req.params.productId;
    try {
      const isProductExistsInWishList = await WishList.findOne({
        userId: req.user.id,
        productId: productId,
      });
      if (!isProductExistsInWishList) {
        return res.status(404).json({ error: 'Product not found in the list' });
      }

      const deletedProduct = await WishList.findOneAndDelete({
        userId: req.user.id,
        productId: productId,
      });

      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found in the list' });
      }

      res.status(200).json({ data: deletedProduct });
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }
);

export default router;
