import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { verifyTokenAuthorization } from '../config/verifyToken.js';
dotenv.config();

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post(
  '/create-checkout-session',

  async (req, res) => {
    const productsData = req.body;
    console.log('🚀 ~ productsData:\n\n\n\n', productsData);

    try {
      if (!productsData) {
        return res.status(400).json({ error: 'No product data provided' });
      }
      if (productsData) {
        const lineItems = productsData.map((product) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              images: [product.image],
            },
            unit_amount: Math.round(product.price * 100), // Convert to cents
          },
          quantity: product.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'], // Specify the payment method types
          line_items: lineItems,
          mode: 'payment', // Set the mode to 'payment' for one-time payments
          success_url: `${process.env.FRONTEND_BASE_URL}/success`,
          cancel_url: `${process.env.FRONTEND_BASE_URL}/cart`,
        });

        res.status(200).json({ id: session.id });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
