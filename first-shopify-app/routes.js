const express =  require('express');
const router = express.Router();

const installController =  require('./src/controllers/installController');

router.get('/shopify', installController.installRoute);

module.exports = router;