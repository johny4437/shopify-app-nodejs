const dotenv = require('dotenv').config();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();

const querystring = require('querystring');
const request = require('request-promise');
const url = require('url');

const verifyCall = require('../tools/verifyCall');
const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = 'read_products';
const forwardingAddress = "https://1e65c356.ngrok.io"; // Replace this with your HTTPS Forwarding address

module.exports = {
    async auth(req, res, next){
        const { shop, hmac, code, state } = req.query;
        const stateCookie = cookie.parse(req.headers.cookie).state;
      
        if (state !== stateCookie) {
          return res.status(403).send('Request origin cannot be verified');
        }
      
        if (shop && hmac && code) {
          // DONE: Validate request is from Shopify
          const map = Object.assign({}, req.query);
          delete map['signature'];
          delete map['hmac'];
          const message = querystring.stringify(map);
          const providedHmac = Buffer.from(hmac, 'utf-8');
          const generatedHash = Buffer.from(
            crypto
              .createHmac('sha256', apiSecret)
              .update(message)
              .digest('hex'),
              'utf-8'
            );
          let hashEquals = false;
      
          try {
            hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac)
          } catch (e) {
            hashEquals = false;
          };
      
          if (!hashEquals) {
            return res.status(400).send('HMAC validation failed');
          }
      
          // DONE: Exchange temporary code for a permanent access token
          const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
          const accessTokenPayload = {
            client_id: apiKey,
            client_secret: apiSecret,
            code,
          };
      
          request.post(accessTokenRequestUrl, { json: accessTokenPayload })
          .then((accessTokenResponse) => {
            const accessToken = accessTokenResponse.access_token;
            console.log('shop token ' + accessToken);

            res.redirect('/shopify/app?shop=' + shop);
           
          })
          .catch((error) => {
            res.status(error.statusCode).send(error.error.error_description);
          });
      
        } else {
          res.status(400).send('Required parameters missing');
        }
       
    }
}