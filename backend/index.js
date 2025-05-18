import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bookRoute from './route/bookroute.js';
import userRoute from './route/userroute.js';

const app = express();
dotenv.config();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

const PORT = process.env.PORT || 4001; // Changed to 4001 to match frontend
const URI = process.env.MongoDBURI;

// Connect to MongoDB with better error handling
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit if cannot connect to database
  });

// Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});