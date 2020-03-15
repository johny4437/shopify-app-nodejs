const express =  require('express');
const router = express.Router();

const installController =  require('./src/controllers/installController');
const productController =  require('./src/controllers/productController');
const prodc = require('./src/middleware/product');

router.get('/shopify', installController.installRoute);
router.get('/shopify/callback', installController.callbackRouter);
router.get('/shopify/app',(req, res, next)=>{
    let shop = req.query.shop;
    res.status(200).json({ message: shop });
    next();
});
router.post('/app/create-product', productController.product);


module.exports = router;