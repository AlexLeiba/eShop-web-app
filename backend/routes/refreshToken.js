import express from 'express';
import User from '../models/User.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const router = express.Router();

router.post('/refresh-token', async (req, res) => {
  const cookies = req.cookies; //cookie jwt token http only which was set during login process.
  if (!cookies.jwt) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const refreshToken = cookies.jwt;
    const loggedUser = await User.findOne({
      refreshToken: refreshToken, //find user based on refreshToken from cookies and database
    });

    if (!loggedUser) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET_KEY,
      (err, decodedUserData) => {
        if (err) {
          return res.status(403).json({ error: 'Forbidden' });
        }

        const accessToken = jwt.sign(
          {
            id: decodedUserData._id,
            email: decodedUserData.email,
            isAdmin: decodedUserData.isAdmin,
            isUberAdmin: decodedUserData.isUberAdmin,
            userName: decodedUserData.userName,
          },
          process.env.JWT_TOKEN_SECRET_KEY,
          { expiresIn: '7d' }
        );
        res.status(200).json({ token: accessToken });
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
