const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config');

const connectDB = async () => {
  mongoose.set('strictQuery', false);
  
  console.log('connecting to', MONGODB_URI);
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('connected to MongoDB');
  } catch (error) {
    console.log('error connection to MongoDB:', error.message);
  }
};

module.exports = connectDB; 