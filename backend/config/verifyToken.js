import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

function verifyToken(req, res) {
  const token = req.headers.token; //client will send token in header at the request

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
        req.user = decodedUserData; // decoded user data from token is added to user object  in request
      }
    );
  }
}

export function verifyTokenAuthorization(req, res, next) {
  verifyToken(req, res, next); //will verify TOKEN and add USER data to REQUEST.USER
  if (req.user.id === req.params.id || req.user.isAdmin) {
    //if the user is 'ADMIN' or the user is the one that is trying to update 'USER DATA'
    next(); //pass to the next middleware
  } else {
    res.status(403).json({ error: 'Not authorized' });
  }
}
export function verifyTokenAuthorizationAndAdmin(req, res, next) {
  verifyToken(req, res, next); //will verify TOKEN and add USER data to REQUEST.USER

  if (req.user.isAdmin) {
    //if the user is 'ADMIN' or the user is the one that is trying to update 'USER DATA'
    next(); //pass to the next middleware
  } else {
    res.status(403).json({ error: 'Not authorized' });
  }
}
