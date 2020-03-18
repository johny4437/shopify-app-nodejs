const dotenv = require('dotenv').config();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');
const path =  require('path');
const shopify = require('shopify-node-api');

const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = 'read_products';
const forwardingAddress = "https://1e65c356.ngrok.io"; // Replace this with your HTTPS Forwarding address


module.exports = {


    async installRoute(req, res){
        const shop = req.query.shop;
        if(shop){
            const state = nonce();
            const redirectURL = forwardingAddress + '/shopify/auth';
            const installURL = 'https://' + shop + '/admin/oauth/authorize?client_id=' + apiKey +
            '&scope='+ scopes +
            '&state=' + state +
            '&redirect_uri='+redirectURL;

            res.cookie('state', state);
            res.redirect(installURL);

         }else{
             return res.status(400).send('Parametro shop perdido. Por favor adicione ?shop=your-development-shop.myshopify.com a sua requisição.');
         }
    }



}