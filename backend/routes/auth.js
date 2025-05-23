import express from 'express';
import User from '../models/User.js';
import dotenv from 'dotenv';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
dotenv.config();

const router = express.Router();

router.post('/register', async (req, res) => {
  //takes path,request handler
  const alreadyExists = await User.find({
    email: req.body.email,
  });

  if (alreadyExists.length > 0) {
    return res.status(400).json({ data: null, error: 'User already exists' });
  }

  // encrypt password here ( hash passwords) and save in DB
  const encryptedPassword = CryptoJS.AES.encrypt(
    req.body.password,
    process.env.SECRET_PASSPHRASE
  );

  const newUser = new User({
    ...req.body,
    password: encryptedPassword.toString(),
  });

  const { password, ...others } = newUser._doc;

  try {
    newUser.save();
    res.status(201).json({ error: null, data: others });
  } catch (error) {
    res.status(500).json({ error: error, data: null });
  }
});

router.post('/login', async (req, res) => {
  try {
    const loggedUser = await User.findOne({
      email: req.body.email,
    });

    if (!loggedUser) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // decrypt password and compare with the one user introduced
    const decryptedPassword = CryptoJS.AES.decrypt(
      loggedUser.password, //crypted password from DB
      process.env.SECRET_PASSPHRASE
    );

    const decryptedPasswordFromDB = decryptedPassword.toString(
      CryptoJS.enc.Utf8
    );

    if (decryptedPasswordFromDB !== req.body.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // verify jwt and send token
    const accessToken = jwt.sign(
      {
        id: loggedUser._id,
        email: loggedUser.email,
        isAdmin: loggedUser.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '7d' }
    );

    const { password, ...others } = loggedUser._doc;
    //send token to client and user data
    res.status(200).json({
      data: {
        data: others,
        token: accessToken,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post('/admin/login', async (req, res) => {
  try {
    const loggedUser = await User.findOne({
      email: req.body.email,
      isAdmin: true,
    });

    if (!loggedUser) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // decrypt password and compare with the one user introduced
    const decryptedPassword = CryptoJS.AES.decrypt(
      loggedUser.password, //crypted password from DB
      process.env.SECRET_PASSPHRASE
    );

    const decryptedPasswordFromDB = decryptedPassword.toString(
      CryptoJS.enc.Utf8
    );

    if (decryptedPasswordFromDB !== req.body.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // verify jwt and send token
    const accessToken = jwt.sign(
      {
        id: loggedUser._id,
        email: loggedUser.email,
        isAdmin: loggedUser.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '7d' }
    );

    const { password, ...others } = loggedUser._doc;
    //send token to client and user data
    res.status(200).json({
      data: {
        data: others,
        token: accessToken,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
