const dotenv = require('dotenv').config();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');
const path =  require('path');
const url = require('url');

const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = 'read_products';
const forwardingAddress = "https://1e65c356.ngrok.io"; // Replace this with your HTTPS Forwarding address

module.exports = {
    async product(req, res){
        
        const code = req.query;
        const acessTokenRequestURL = 'https://' + req.query.shop + '/admin/oauth/access_token';
        const acessTokenPayload = {
            client_id: apiKey,
            client_secret: apiSecret,
            code
        };

        request.post(acessTokenRequestURL, {json: acessTokenPayload })
        .then((acessTokenResponde)=>{
            const accessToken = acessTokenResponde.access_token;
            

              let new_product = {
                product: {
                    title: req.body.title,
                    body_html: req.body.body_html,
                    vendor: req.body.vendor,
                    product_type: req.body.product_type,
                    tags: req.body.tags
                }
            };
            console.log(req.query.shop);
            let url = 'https://' + req.query.shop + '/admin/products.json';
        
            let options = {
                method: 'POST',
                uri: url,
                json: true,
                resolveWithFullResponse: true,//added this to view status code
                headers: {
                    'X-Shopify-Access-Token': accessToken,
                    'content-type': 'application/json'
                },
                body: new_product//pass new product object - NEW - request-promise problably updated
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
        


             })
             
             
          
          .catch((error) => {
            res.status(error.statusCode).send(error.error.error_description);
          });

    }
}