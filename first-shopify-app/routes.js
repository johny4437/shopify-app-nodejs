const express =  require('express');
const router = express.Router();

const installController =  require('./src/controllers/installController');
const productController =  require('./src/controllers/productController');
const prodc = require('./src/middleware/product');

router.get('/shopify', installController.installRoute);
router.get('/shopify/callback', installController.callbackRouter);



module.exports = router;