import express from 'express';
import {
  verifyTokenAuthorization,
  verifyTokenAuthorizationAndAdmin,
} from '../config/verifyToken.js';
import Order from '../models/Order.js';

import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// GET USER ORDER
router.get('/order/:id', verifyTokenAuthorization, async (req, res) => {
  try {
    const orderID = req.params.id;

    if (!orderID) {
      return res.status(400).json({ error: 'No order ID provided' });
    }

    if (orderID) {
      const order = await Order.findById(orderID);

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.status(200).json({ data: order });
    }
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});
// GET ALL USER ORDERS
router.get('/orders', verifyTokenAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    if (!orders) {
      return res.status(404).json({ error: 'No orders found' });
    }

    if (!orders) {
      return res.status(404).json({ error: 'Not orders found' });
    }

    res.status(200).json({ data: orders });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

// GET ALL ORDERS (ONLY ADMIN)
router.get(
  '/admin/orders',
  verifyTokenAuthorizationAndAdmin,
  async (req, res) => {
    try {
      const orders = await Order.find();
      if (!orders) {
        return res.status(404).json({ error: 'No orders found' });
      }

      res.status(200).json({ data: orders });
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }
);

// POST ORDER
router.post('/order', verifyTokenAuthorization, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(201).json({ data: savedOrder });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

// UPDATE ORDER (ONLY ADMIN)
router.put(
  '/order/:orderId',
  verifyTokenAuthorizationAndAdmin,
  async (req, res) => {
    const queryOrderId = req.params.orderId;
    if (!queryOrderId) {
      return res.status(400).json({ error: 'No order ID provided' });
    }
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        queryOrderId,
        {
          $set: req.body,
        },
        { new: true, runValidators: true }
      );

      res.status(200).json({ data: updatedOrder });
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }
);

//DELETE ORDER (ONLY ADMIN)
router.delete(
  'admin/order/:orderId',
  verifyTokenAuthorizationAndAdmin,
  async (req, res) => {
    const queryOrderId = req.params.orderId;
    if (!queryOrderId) {
      return res.status(400).json({ error: 'No order ID provided' });
    }
    try {
      const deletedOrder = await Order.findByIdAndDelete({
        id: queryOrderId,
      });

      if (!deletedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.status(200).json({ data: { message: 'Order deleted successfully' } });
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }
);

// DELETE MULTIPLE PRODUCTS (ONLY ADMIN)
router.delete(
  '/admin/orders',
  verifyTokenAuthorizationAndAdmin,
  async (req, res) => {
    try {
      const orderIds = req.body.orderIds;

      if (!orderIds) {
        return res.status(400).json({ error: 'No product Ids provided' });
      }

      if (orderIds) {
        const allOrders = await Order.find({ id: { $in: orderIds } });

        if (allOrders.length === 0) {
          return res.status(404).json({ error: 'No orders found' });
        }

        const deletedOrder = await Order.deleteMany({
          id: { $in: orderIds },
        });

        if (!deletedOrder) {
          return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({
          data: { message: 'The orders were deleted successfully' },
        });
      }
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }
);

// GET MONTHLY INCOME STATS (ONLY ADMIN)
router.get(
  'admin/orders/stats',
  verifyTokenAuthorizationAndAdmin,
  async (req, res) => {
    const currentDate = new Date();

    const lastMonth = new Date(
      currentDate.setMonth(currentDate.getMonth() - 1)
    );
    const prevMonth = new Date(
      currentDate.setMonth(lastMonth.getMonth() - 1)
    ).getMonth();

    try {
      // AGGREGATE: Group items by month with aggregation( $agregate : filter, group, sort, join, and reshape data)

      const groupedDataIncome = await Order.aggregate([
        {
          $match: {
            createdAt: {
              $gte: prevMonth, //from 2 month ago until now
            },
          },
        },
        {
          $project: {
            //select/rename fields
            month: { $month: '$createdAt' }, //take 'month' from 'createdAt' field
            sales: '$amount',
          },
        },
        {
          // adds new fields to the document, grouping by month
          $group: {
            _id: '$month', //group by month
            totalSales: {
              $sum: '$sales', //count total
            },
          },
        },
      ]);

      res.status(200).json({ data: groupedDataIncome });
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }
);

export default router;
