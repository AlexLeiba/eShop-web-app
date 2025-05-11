import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

function verifyToken(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  if (token) {
    jwt.verify(
      token.split(' ')[1], //skip Bearer and get the token
      process.env.JWT_SECRET_KEY,
      (err, decodedUserData) => {
        if (err) {
          return res.status(401).json({ error: 'Not valid token' });
        }
        req.user = decodedUserData;
      }
    );
  }
}

export function verifyTokenAuthorization(req, res, next) {
  verifyToken(req, res, next);
  if (req.user.id === req.params.id || req.user.isAdmin) {
    //if the user is 'ADMIN' or the user is the one that is trying to update 'USER DATA'
    next(); //pass to the next middleware
  } else {
    res.status(403).json({ error: 'Not authorized' });
  }
}
