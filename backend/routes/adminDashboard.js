import express from 'express';
import User from '../models/User.js';
import Orders from '../models/Order.js';
import { verifyTokenAuthorizationAndAdmin } from '../config/verifyToken.js';

import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// GET INDIVIDUAL USER
router.get(
  '/admin/dashboard',
  verifyTokenAuthorizationAndAdmin,
  async (req, res) => {
    const currentDate = new Date();
    const lastYear = new Date(
      currentDate.setFullYear(currentDate.getFullYear() - 1)
    );
    try {
      ///////////////// USERS
      const users = await User.find().sort({ createdAt: -1 }).limit(5);

      if (!users) {
        return res.status(404).json({ error: 'No user found' });
      }

      ///////////////// STATS
      // AGGREGATE: Group items by month with aggregation( $agregate : filter, group, sort, join, and reshape data)
      const groupedData = await User.aggregate([
        {
          $match: {
            createdAt: {
              $gte: lastYear, // ($gte greater than) from last year to current year
            },
          },
        },
        {
          //filter like find() conditions
          $project: {
            //select/rename fields
            month: { $month: '$createdAt' }, //take month from createdAt field
          },
        },
        {
          //group and count
          $group: {
            _id: '$month', //group by month
            total: {
              $sum: 1, //count total
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]);

      // TRANSACTIONS
      const transactions = await Orders.find().sort({ createdAt: -1 }).limit(5);

      res.status(200).json({
        data: {
          users: users,
          transactions: transactions || [],
          usersStats: groupedData || [],
        },
      });
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }
);

export default router;
