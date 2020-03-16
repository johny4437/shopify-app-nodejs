const dotenv = require('dotenv').config();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');
const path =  require('path');

const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = 'read_products';
const forwardingAddress = "https://327223c7.ngrok.io"; // Replace this with your HTTPS Forwarding address


module.exports = {


    async installRoute(req, res){
        const shop = req.query.shop;
        if(shop){
            const state = nonce();
            const redirectURL = forwardingAddress + '/shopify/callback';
            const installURL = 'https://' + shop + '/admin/oauth/authorize?client_id=' + apiKey +
            '&scope='+ scopes +
            '&state=' + state +
            '&redirect_uri='+redirectURL;

            res.cookie('state', state);
            res.redirect(installURL);

         }else{
             return res.status(400).send('Parametro shop perdido. Por favor adicione ?shop=your-development-shop.myshopify.com a sua requisição.');
         }
    },

    //ROTA DE CALLBACK

    async callbackRouter(req, res){
        const {shop, hmac, code, state} = req.query;
        const stateCookie = cookie.parse(req.headers.cookie).state;

        if(state !== stateCookie){
            return res.status(403).send(" A origem da requisição não pode ser verificada.");
        }
        if(shop && hmac && code){
            const map = Object.assign({}, req. query);
            delete map ['signature'];
            delete map['hmac'];
            
            const message = querystring.stringify(map);
            const providedeHmac = Buffer.from(hmac,'utf-8');
            const generatedHash = Buffer.from(
                crypto
                  .createHmac('sha256', apiSecret)
                  .update(message)
                  .digest('hex'),
                  'utf8'
                );

            let hashEquals = false;

            try {
                hashEquals = crypto.timingSafeEqual(generatedHash, providedeHmac);
            } catch (e) {
                hashEquals = false;
            };

            if(!hashEquals){
                return res.status(400).send('HMAC validation failed::');
            }
            const acessTokenRequestURL = 'https://' + shop + '/admin/oauth/access_token';
            const acessTokenPayload = {
                client_id: apiKey,
                client_secret: apiSecret,
                code
            };

            request.post(acessTokenRequestURL, {json: acessTokenPayload })
            .then((acessTokenResponde)=>{
                const accessToken = acessTokenResponde.access_token;
                
                res.sendFile(path.join(__dirname , '..','views','index.html'));
                
              })
              .catch((error) => {
                res.status(error.statusCode).send(error.error.error_description);
              });
        }else{
            res.status(400).send("Something is wrong.")
        }
    }
}