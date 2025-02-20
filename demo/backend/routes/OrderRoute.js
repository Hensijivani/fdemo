var express = require('express');
var router = express.Router();
var authMiddleware = require('../Middleware/AuthCheck');
const { placeOrder } = require('../Controller/OrderController'); // Destructured import

router.post('/place', authMiddleware.tokenSecure, placeOrder); // Pass the callback correctly

module.exports = router;


