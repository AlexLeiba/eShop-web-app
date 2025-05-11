import express from 'express';
import dotenv from 'dotenv';
import { mongodbConnect } from './config/mongodb.js';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express(); //initialize express app

// MONGODB CONNECTION
mongodbConnect();

// MIDDLEWARES CONFIGURATION
app.use(express.json()); // parse application/json - all the req passed will be json format (with that config we will pass any json file to the server)
app.use(cookieParser()); // Parses cookies attached to the client request./ Extracts cookies from incoming HTTP requests and makes them available in req.cookies.
app.use(cors()); // enable cors

// SERVER TEST
app.get('/', (req, res) => {
  res.json({ message: 'Server is running on port 4000' });
});

// ROUTES
app.use('/api', authRoutes);
app.use('/api', userRoutes);

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
