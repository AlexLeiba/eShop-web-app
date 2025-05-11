import express from 'express';
import { verifyTokenAuthorization } from '../config/verifyToken.js';
import CryptoJS from 'crypto-js';
import User from '../models/User.js';

import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

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

  // res.status(400).json({ error: 'No password provided' });
});

export default router;
