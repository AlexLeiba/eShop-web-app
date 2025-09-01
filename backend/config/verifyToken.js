import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// a middleware request handler ( runs before the Request handler which returns the resources)
function verifyToken(req, res) {
  const token = req.headers.token; //client will send token in header at the request

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (token) {
    //TODO check if token hasnt expired
    jwt.verify(
      token.split(" ")[1], //skip Bearer and get the token
      process.env.JWT_TOKEN_SECRET_KEY,
      (err, decodedUserData) => {
        console.log("🚀 ~ verifyToken ~ err:\n\n\n\n", err);
        if (err && err.name === "TokenExpiredError") {
          return res.status(403).json({ error: "Your session has expired" });
        }
        if (err && err.name !== "TokenExpiredError") {
          return res.status(403).json({ error: "Forbidden" });
        }
        req.user = decodedUserData; // decoded user data from token is added to user object  in request
      }
    );
  }
}

export function verifyTokenAuthorization(req, res, next) {
  verifyToken(req, res, next); //will verify TOKEN and add USER data to REQUEST.USER
  if (req.user.id) {
    //if  the user is the one that is trying to update 'USER DATA'
    next(); //pass to the next middleware
  } else {
    res.status(403).json({ error: "Unauthorized" });
  }
}
export function verifyTokenAuthorizationAndAdmin(req, res, next) {
  verifyToken(req, res, next); //will verify TOKEN and add USER data to REQUEST.USER

  if (req.user.isAdmin || req.user.isUberAdmin) {
    //if the user is 'ADMIN' or the user is the one that is trying to update 'USER DATA'
    next(); //pass to the next middleware
  } else {
    res.status(403).json({ error: "Unauthorized" });
  }
}
