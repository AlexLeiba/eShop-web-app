import express from 'express';
import User from '../models/User.js';
import dotenv from 'dotenv';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import { verifyTokenAuthorization } from '../config/verifyToken.js';
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
  ).toString();

  const newUser = new User({
    ...req.body,
    password: encryptedPassword.toString(),
    id: uuidv4(),
  });

  const { password, ...others } = newUser._doc;

  try {
    newUser.save();
    res.status(201).json({ error: null, data: { ...others } });
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
      return res.status(401).json({ error: 'User not found' });
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
      return res.status(401).json({ error: 'Password is incorrect' });
    }

    // Access Token for client
    const accessToken = jwt.sign(
      {
        id: loggedUser._id,
        email: loggedUser.email,
        isAdmin: loggedUser.isAdmin,
        isUberAdmin: loggedUser.isUberAdmin,
        userName: loggedUser.userName,
      },
      process.env.JWT_TOKEN_SECRET_KEY,
      { expiresIn: '7d' }
    );

    // Refresh Token for server | will be used when access token expires in order to refresh it .
    // Refresh token will be stored on database in order to check if user is valid when a new AccessToken is requested
    const refreshToken = jwt.sign(
      {
        id: loggedUser._id,
        email: loggedUser.email,
        isAdmin: loggedUser.isAdmin,
        isUberAdmin: loggedUser.isUberAdmin,
        userName: loggedUser.userName,
      },
      process.env.JWT_REFRESH_SECRET_KEY,
      { expiresIn: '30d' }
    );

    const updatedUserData = await User.findOneAndUpdate(
      { _id: loggedUser._id },
      {
        $set: {
          refreshToken: refreshToken,
        },
      }
    );

    updatedUserData.save();
    /////////////

    // res.cookie('jwt', refreshToken, {
    //   //Set refresh token to cookies http only
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    //   maxAge: 120 * 10000, // 120 seconds TODO to change after testing
    // });

    const { password, ...others } = loggedUser._doc;
    //send token to client and user data
    res.status(200).json({
      data: {
        data: others,
        token: accessToken,
      },
    });
  } catch (error) {
    console.log('🚀 ~ error:', error);
    res.status(500).json(error);
  }
});

// LOGOUT
router.post('/logout', async (req, res) => {
  const userEmail = req.body.email;

  try {
    if (!userEmail) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const currentUser = await User.findOne({ email: userEmail });

    if (!currentUser) {
      return res.status(401).json({ error: 'User not found' });
    }

    // DELETE refresh token from database
    currentUser.refreshToken = null;
    await currentUser.save();

    // DELETE refresh token cookie
    // req.clearCookie('jwt', {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'none',
    //   maxAge: 120 * 10000, // 120 seconds TODO to change after testing
    // });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log('🚀 ~ error:', error);
    res.status(500).json(error);
  }
});

// ADMIN LOGIN
router.post('/admin/login', async (req, res) => {
  try {
    const loggedUser = await User.findOne({
      email: req.body.email,

      $or: [{ isAdmin: true }, { isUberAdmin: true }],
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
        userName: loggedUser.userName,
        isUberAdmin: loggedUser.isUberAdmin,
      },
      process.env.JWT_TOKEN_SECRET_KEY,
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
    console.log('🚀 ~ error:', error);
    res.status(500).json(error);
  }
});

// SEND OTP CODE TO USER EMAIL
const otpCode = Math.floor(100000 + Math.random() * 900000);
router.post('/forgot-password', async (req, res) => {
  const userEmail = req.body.email;

  try {
    const userExists = await User.findOne({ email: userEmail });

    if (!userExists) {
      return res.status(400).json({ error: 'User not found' });
    }

    const userUpdated = await User.findOneAndUpdate(
      { email: userEmail },
      {
        $set: { forgotPasswordCode: otpCode, otpVerified: false },
      },
      {
        new: true,
      }
    );

    userUpdated.save();

    const emailBody = `
    <h2>Reset your password</h2>
    <p>Hello <b>${userUpdated.userName}</b>,</p>
    <p>You recently requested to reset your password. To reset your password, introduce the following code in your app </p>
    <p><b>Code: ${userUpdated.forgotPasswordCode}</b></p>
    <p>If you did not request a password reset, please ignore this email.</p>
    <p>Thank you for using our service.</p>
    <p><b>The eShop Team </b> </p>
    `;

    const textBody = `Hello ${userUpdated.userName}, <br> You recently requested to reset your password. To reset your password, introduce the following code in your app <br> <b>Code: ${userUpdated.forgotPasswordCode}</b> <br> If you did not request a password reset, please ignore this email. <br> Thank you for using our service. <br> <b>The eShop Team </b>`;

    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      auth: {
        user: process.env.SMTP_USER, //admin gmail
        pass: process.env.SMTP_PASSWORD, // admin password
      },
    });

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL, //admin gmail
      to: userEmail, //
      subject: 'eShop - Reset password code',
      html: emailBody,
      text: textBody,
    });

    res
      .status(200)
      .json({ error: null, data: { message: 'Email sent successfully' } });
  } catch (error) {
    res.status(500).json({ error: error.message, data: null });
  }
});

// CHECK OTP AFTER USER ENTERED THE CODE
router.post('/check-otp', async (req, res) => {
  const userEmail = req.body.email;
  const otp = req.body.otp;

  try {
    const userExists = await User.findOne({ email: userEmail });
    if (!userExists) {
      return res.status(400).json({ error: 'User not found' });
    }
    if (userExists.forgotPasswordCode !== otp) {
      return res.status(400).json({ error: 'Invalid code' });
    }
    const userData = await User.findOneAndUpdate(
      { email: userEmail },
      {
        $set: { forgotPasswordCode: null, otpVerified: true },
      }
    );
    userData.save();
    res
      .status(200)
      .json({ error: null, data: 'The code was introduced correctly' });
  } catch (error) {
    res.status(500).json({ error: error.message, data: null });
  }
});

// RESET PASSWORD AFTER THE OTP WAS INTRODUCED CORRECTLY
router.post('/reset-password', async (req, res) => {
  const userEmail = req.body.email;
  const password = req.body.password;

  try {
    const userExists = await User.findOne({ email: userEmail });
    if (!userExists) {
      return res.status(400).json({ error: 'User not found' });
    }

    if (!userExists.otpVerified && !userExists.forgotPasswordCode) {
      return res.status(400).json({ error: 'Otp is not verified' });
    }

    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_PASSPHRASE
    );

    const updatedUserData = await User.findOneAndUpdate(
      { email: userEmail },
      {
        $set: { password: encryptedPassword.toString(), otpVerified: false },
      }
    );
    updatedUserData.save();

    res
      .status(200)
      .json({ error: null, data: 'Password was resetted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message, data: null });
  }
});

export default router;
