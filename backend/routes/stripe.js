import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { verifyTokenAuthorization } from '../config/verifyToken.js';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import { v4 as uuidv4 } from 'uuid';
dotenv.config();

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post(
  '/create-checkout-session/:language',
  verifyTokenAuthorization,
  async (req, res) => {
    const productsData = req.body;
    const language = req.params.language;

    try {
      if (!productsData) {
        return res.status(400).json({ error: 'No product data provided' });
      }
      if (productsData) {
        const lineItems = productsData.map((product) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.title,
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
          success_url: `${process.env.FRONTEND_BASE_URL}/success?sessionId={CHECKOUT_SESSION_ID}&language=${language}`, //stripe will auto replace {CHECKOUT_SESSION_ID} with the session id ( ITS STRIPE ID )
          cancel_url: `${process.env.FRONTEND_BASE_URL}/cancel?sessionId={CHECKOUT_SESSION_ID}&language=${language}`,
        });

        const purchaseOrderData = {
          id: uuidv4(), // Generate a unique ID for the order
          userId: req.user.id,
          userName: req.user.userName,
          userEmail: req.user.email,
          stripeId: session.id,
          products: productsData.map((product) => ({
            ...product,
            title: language === 'ro' ? product.roTitle : product.enTitle,
            totalPrice: product.quantity * product.price,
          })),
          quantity: productsData.reduce(
            (acc, product) => acc + product.quantity,
            0
          ),
          totalPrice: productsData.reduce((acc, curr) => {
            return acc + curr.quantity * curr.price;
          }, 0),
          status: 'pending',
        };

        const newOrder = await Order.create(purchaseOrderData);

        newOrder.save();

        // On click order, i create Order data an transaction with status: pending, with id session.id. after user success paid, redirect to success page and there i Edit the Order by ID and set it to PAID . On redirect to ERROR page, i set the Order to CANCELED

        // IF order is succes. Clear the CART in DB and REDUX.

        res.status(200).json({ id: session.id, data: session });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.get('/success', verifyTokenAuthorization, async (req, res) => {
  const sessionId = req.query.sessionId;

  try {
    const successPaymentOrder = await Order.findOne({ stripeId: sessionId });
    if (!successPaymentOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    successPaymentOrder.status = 'PAID';
    successPaymentOrder.save();

    // CLEAR CART AFTER PAYMENT SUCCESS
    const clearedCart = await Cart.deleteOne({
      userId: req.user.id,
    });
    if (!clearedCart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.status(200).json({ message: 'Order paid successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  res.json({ sessionId });
  // how to get the session id from the stripe
});

router.get('/cancel', verifyTokenAuthorization, async (req, res) => {
  const sessionId = req.query.sessionId;
  console.log('🚀 ~ router.get ~ sessionId:\n\n\n', sessionId);

  try {
    const canceledPaymentOrder = await Order.findOne({ stripeId: sessionId });
    if (!canceledPaymentOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    canceledPaymentOrder.status = 'CANCELED';
    canceledPaymentOrder.save();
    res.status(200).json({ message: 'Order canceled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
