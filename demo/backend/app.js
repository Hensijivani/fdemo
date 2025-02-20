var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var userRouter = require('./routes/UserRoute');
var orderRouter = require('./routes/OrderRoute')
var foodRouter = require('./routes/FoodRouter')

var app = express();

mongoose.connect('mongodb://localhost:27017/Food_Delivery_Api')
  .then(() => {
    console.log("Connection Success");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/img", express.static(path.join(__dirname, 'images'))); 
const cors = require('cors');
app.use(cors());

app.use('/user', userRouter); 
app.use('/order',orderRouter)
app.use('/food',foodRouter)
app.use("/img",express.static("images"))

module.exports = app;
