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
router.get('/wishlist', verifyTokenAuthorization, async (req, res) => {
  const queryLanguage = req.query.language;
  try {
    const wishList = await WishList.find({ userId: req.user.id });
    if (!wishList) {
      return res.status(404).json({ error: 'No wishlist found' });
    }

    const responseWithLocalization = wishList.map((item) => {
      return {
        ...item._doc,
        title: queryLanguage === 'ro' ? item.roTitle : item.enTitle,
        description:
          queryLanguage === 'ro' ? item.roDescription : item.enDescription,
      };
    });

    res.status(200).json({ data: responseWithLocalization });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE
router.put(
  '/wishlist/:productId',
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
          .json({ error: 'The product already exists in the wishlist' });
      }
      const newProductInWishList = new WishList({
        userId: req.user.id,
        productId: productId,
        ...req.body,
      });

      newProductInWishList.save();

      const allWishlistProducts = await WishList.find({
        userId: req.user.id,
      });

      if (allWishlistProducts.length === 0) {
        return res.status(201).json({ data: [newProductInWishList] });
      }
      res.status(201).json({ data: allWishlistProducts });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// DELETE
router.delete(
  '/wishlist/:productId',
  verifyTokenAuthorization,
  async (req, res) => {
    const productId = req.params.productId;
    try {
      const isProductExistsInWishList = await WishList.findOne({
        userId: req.user.id,
        productId: productId,
      });
      if (!isProductExistsInWishList) {
        return res
          .status(404)
          .json({ error: 'Product not found in the wishlist' });
      }

      const deletedProduct = await WishList.findOneAndDelete({
        userId: req.user.id,
        productId: productId,
      });

      if (!deletedProduct) {
        return res
          .status(404)
          .json({ error: 'Product not found in the wishlist' });
      }

      const allWishlistProducts = await WishList.find({
        userId: req.user.id,
      });

      res.status(200).json({ data: allWishlistProducts });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// DELETE ALL WISHLIST ELEMENTS
router.delete(
  '/wishlist-delete',
  verifyTokenAuthorization,
  async (req, res) => {
    try {
      const wishlist = await WishList.deleteMany({
        userId: req.user.id,
      });
      if (!wishlist) {
        return res.status(404).json({ error: 'No wishlist was found' });
      }

      res.status(200).json({ data: wishlist });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
