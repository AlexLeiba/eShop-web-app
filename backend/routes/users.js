import express from 'express';
import { verifyTokenAuthorizationAndAdmin } from '../config/verifyToken.js';
import CryptoJS from 'crypto-js';
import User from '../models/User.js';

import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// FOR ADMIN ONLY //

// GET INDIVIDUAL USER
router.get(
  '/admin/user/:userId',
  verifyTokenAuthorizationAndAdmin,
  async (req, res) => {
    try {
      const userID = req.params.userId;

      if (!userID) {
        return res.status(400).json({ error: 'No user ID provided' });
      }

      if (userID) {
        const user = await User.findById(userID);

        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ data: user });
      }
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }
);

// UPDATE USER DATA

router.put(
  '/admin/user/:userId',
  verifyTokenAuthorizationAndAdmin,
  async (req, res) => {
    const userId = req.params.userId;
    try {
      if (req.body.password) {
        //encrypt password if was passed in body
        const encryptedPassword = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_PASSPHRASE
        );
        req.body.password = encryptedPassword.toString();
      }

      const updatedUserData = await User.findByIdAndUpdate(
        userId,
        {
          $set: req.body,
        },
        { new: true, runValidators: true }
      );

      const { password, ...others } = updatedUserData._doc;
      res.status(200).json({ data: { ...others } });
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }
);

// DELETE USER
router.delete(
  '/admin/user/:userId',
  verifyTokenAuthorizationAndAdmin,
  async (req, res) => {
    try {
      const userID = req.params.userId;

      const user = await User.findById(userID);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (user.isUberAdmin) {
        return res
          .status(400)
          .json({ error: 'You can not delete an UberAdmin' });
      }

      if (!userID) {
        return res.status(400).json({ error: 'No user ID provided' });
      }

      if (userID) {
        const deletedUser = await User.findByIdAndDelete(userID);

        if (!deletedUser) {
          return res.status(404).json({ error: 'User not found' });
        }

        res
          .status(200)
          .json({ data: { message: 'User deleted successfully' } });
      }
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }
);
// DELETE MULTIPLE USER
router.delete(
  '/admin/users',
  verifyTokenAuthorizationAndAdmin,
  async (req, res) => {
    try {
      const usersIds = req.body.userIds;

      if (!usersIds) {
        return res.status(400).json({ error: 'No user ID provided' });
      }

      if (usersIds) {
        const deletedUsers = await User.deleteMany({ id: { $in: usersIds } });

        if (!deletedUsers) {
          return res.status(404).json({ error: 'User not found' });
        }

        res
          .status(200)
          .json({ data: { message: 'The users were deleted successfully' } });
      }
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }
);

export default router;

//GET ALL USERS (ONLY ADMIN)
router.get(
  '/admin/users',
  verifyTokenAuthorizationAndAdmin,
  async (req, res) => {
    try {
      const allUsers = await User.find().sort({ createdAt: -1 });
      // sort by createdAt in descending order

      if (!allUsers) {
        return res.status(404).json({ error: 'No users found' });
      }

      res.status(200).json({ data: allUsers });
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }
);

//GET USER STATS (ONLY ADMIN) total nr of user per month (registered, active, etc)
router.get(
  '/admin/users/stats',
  verifyTokenAuthorizationAndAdmin,
  async (req, res) => {
    const currentDate = new Date();
    const lastYear = new Date(
      currentDate.setFullYear(currentDate.getFullYear() - 1)
    );

    try {
      // AGGREGATE: Group items by month with aggregation( $agregate : filter, group, sort, join, and reshape data)

      const groupedData = await User.aggregate([
        {
          $match: {
            createdAt: {
              // check if user has data greater than last year
              $gte: lastYear, // ($gte greater than) from Last year to Current year
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
              $sum: 1, //count total users in that month which have joined the platform
            },
          },
        },
      ]);

      res.status(200).json({ data: groupedData });
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }
);
