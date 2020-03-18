const express =  require('express');
const router = express.Router();
const Shopify = require('shopify-node-api');

const installController =  require('./src/controllers/installController');
const productController =  require('./src/controllers/productController');
const authController =  require('./src/controllers/authController');
const prodc = require('./src/middleware/product');

router.get('/shopify', installController.installRoute);
router.get('/shopify/auth', authController.auth);
router.get('/shopify/app', function (req, res, next) {
    let shop = req.query.shop;
    res.send( { shop: shop });
});
router.post('/app/create-a-product',productController.product)



module.exports = router;