import express from 'express';
import dotenv from 'dotenv';
import { mongodbConnect } from './config/mongodb.js';
import { cloudinaryConnect } from './config/cloudinary.js';

import cors from 'cors';
import cookieParser from 'cookie-parser';

// ROUTES
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/carts.js';
import orderRoutes from './routes/orders.js';
import stripeRoutes from './routes/stripe.js';
import wishListRoutes from './routes/wishList.js';
import adminDashboardRoutes from './routes/adminDashboard.js';

dotenv.config(); //to use .env file

const app = express(); //initialize express app

// MONGODB CONNECTION
mongodbConnect();

// CLOUDINARY CONNECTION
cloudinaryConnect();

// MIDDLEWARES CONFIGURATION
app.use(express.json({ limit: '50mb' })); // parse application/json - all the req passed will be json format (with that config we will pass any json file to the server)
app.use(express.urlencoded({ limit: '50mb', extended: true })); //default is 100b for JSON payloads
app.use(cookieParser()); // Parses cookies attached to the client request./ Extracts cookies from incoming HTTP requests and makes them available in req.cookies.

const allowedOrigins = [
  process.env.FRONTEND_BASE_URL,
  process.env.ADMIN_BASE_URL,
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions)); // enable specified cors options

// SET HEADERS
app.use((_, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' ; object-src 'none';" //Controls which sources are allowed to load content (scripts, styles, etc.).This is the most powerful defense against XSS.
  );
  res.setHeader('X-Content-Type-Options', 'nosniff'); //Prevents the browser from MIME-sniffing a response away from the declared Content-Type.
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin'); //Prevents leaking sensitive URLs via Referer header.
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

// SERVER TEST
app.get('/', (req, res) => {
  res.json({ message: 'Server is running on port 4000' });
});

// ROUTES
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);
app.use('/api', stripeRoutes);
app.use('/api', wishListRoutes);
app.use('/api', adminDashboardRoutes);

///// SERVER RUNNING//////
const PORT = process.env.PORT || 4000;

async function server() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log('Failed to start server...', error.message);
    process.exit(1); // exit with error code 1
  }
}

server();
