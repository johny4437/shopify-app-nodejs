const shopify =  require('shopify-node-api');
const nonce = require('nonce')();

var Shopify = new shopifyAPI({
  shop: 'burn-johny.myshopify.com', // MYSHOP.myshopify.com
  shopify_api_key: '65c75c474a3d611d7001639254e81a5d', // Your API key
  shopify_shared_secret: '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', // Your Shared Secret
  shopify_scope: 'write_products',
  redirect_uri: 'https://3e637e85.ngrok.io/finish_auth',
  nonce: nonce()// you must provide a randomly selected value unique for each authorization request
});


var auth_url = Shopify.buildAuthURL();