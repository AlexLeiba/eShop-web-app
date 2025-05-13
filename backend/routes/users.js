import express from 'express';
import {
  verifyTokenAuthorization,
  verifyTokenAuthorizationAndAdmin,
} from '../config/verifyToken.js';
import CryptoJS from 'crypto-js';
import User from '../models/User.js';

import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

//GET ALL USERS (ONLY ADMIN)
router.get('/users/:id', verifyTokenAuthorizationAndAdmin, async (req, res) => {
  try {
    const allUsers = await User.find();

    if (!allUsers) {
      return res.status(404).json({ error: 'No users found' });
    }

    res.status(200).json({ data: allUsers });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

//GET USER STATS (ONLY ADMIN) total nr of user per month (registered, active, etc)
router.get('/stats', verifyTokenAuthorizationAndAdmin, async (req, res) => {
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
    ]);

    res.status(200).json({ data: groupedData });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

// GET INDIVIDUAL USER
router.get('/user/:id', verifyTokenAuthorization, async (req, res) => {
  try {
    const userID = req.params.id;

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
});

// UPDATE USER DATA
// TODO, to change only to admin
router.put('/user/:id', verifyTokenAuthorization, async (req, res) => {
  try {
    if (req.body.password) {
      //encrypt password if was passed in body
      const encryptedPassword = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_PASSPHRASE
      );
      req.body.password = encryptedPassword.toString();
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: req.body,
      },
      { new: true, runValidators: true }
    );
    const { password, ...others } = updatedUser._doc;
    res.status(200).json({ data: others });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

// DELETE USER
router.delete('/user/:id', verifyTokenAuthorization, async (req, res) => {
  try {
    const userID = req.params.id;

    if (!userID) {
      return res.status(400).json({ error: 'No user ID provided' });
    }

    if (userID) {
      const deletedUser = await User.findByIdAndDelete(userID);

      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ data: { message: 'User deleted successfully' } });
    }
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

export default router;
