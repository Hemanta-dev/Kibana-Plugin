require('dotenv').config();
const mongoose = require('mongoose');

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }; 
  // Set the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0'
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1';

  try {
    mongoose.connect(process.env.DB, connectionParams);
    console.log('Connected to Database Successfully');
  } catch (error) {
    console.log(error);
    console.log("Couldn't connect to the database!");
  }
};