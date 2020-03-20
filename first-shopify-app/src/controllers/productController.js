
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise-native').defaults({ family: 4 })
const path =  require('path');
const url = require('url');
const ShopifyAPI =  require('shopify-node-api');
const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = 'read_products';
const forwardingAddress = "https://1e65c356.ngrok.io"; // Replace this with your HTTPS Forwarding address

module.exports = {
    async product(req, res){

        let {shop} =  req.query;
        

              let new_product = {
               
            };
            console.log(shop);
            
            let URL = 'https://'+ shop +'/admin/api/2020-01/products.json';
            let accessToken = " 7107724b30124422b9e1dcbf36a13d21";
            var options = {
                method: 'POST',
                uri: URL,
                body: {
                    "product": {
                        "title": "Burton Custom Freestyle 151",
                        "body_html": "<strong>Good snowboard!</strong>",
                        "vendor": "Burton",
                        "product_type": "Snowboard",
                        "tags": [
                          "Barnes & Noble",
                          "John's Fav",
                          
                        ]
                      }
                },
                json: true ,
                headers: {
                    'X-Shopify-Access-Token': accessToken,
                    'content-type': 'application/json'
                },
            };
        
            request.post(options)
                .then(function (response) {
                    console.log(response.body);
                    if (response.statusCode == 201) {
                        res.json(true);
                    } else {
                        res.json(false);
                    }
        
                })
                .catch(function (err) {
                    console.log(err);
                    res.json(false);
                });
        


             
        

    }
}