const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({path:"./config.env"});

const DB = process.env.MONGO_PROD_URI;

mongoose.connect(DB).then(() => {
    console.log("CONNECTION SUCCESS");
});

const app = require("./app");

// console.log(process.env);

const port =  process.env.PORT || 3000 ;
app.listen(port,()=>{
    console.log(`App is running on port ${port}`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});