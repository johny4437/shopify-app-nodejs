
const nonce = require('nonce')();
const request = require('request-promise-native').defaults({ family: 4 })



module.exports = {
    async product(req, res){

        let {shop} =  req.query;
        

            console.log(shop);
            
            let URL = 'https://burn-johny.myshopify.com/admin/api/2020-01/products.json';
            let accessToken = " 7107724b30124422b9e1dcbf36a13d21";
            var options = {
                method: 'POST',
                uri: URL,
                body: {
                    "product": {
                        "title": req.body.title,
                        "body_html": "<strong>Good snowboard!</strong>",
                        "vendor": req.body.vendor,
                        "product_type": req.body.product_type,
                        "tags": [req.body.tags ]
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
                .catch(function (error) {
                    console.log("error to insert product");
                    res.json(false);
                });
        


             
        

    }
}