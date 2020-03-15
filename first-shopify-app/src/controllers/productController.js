const request = require('request-promise');

module.exports = {

    async product(req, res){
        let new_product = {
            product:{
                title: req.body.title,
                vendor: req.body.vendor,
                product_type: req.body.type,
                tags: req.body.tags
            }
        };

        console.log(req.query.shop);

        let url = 'https://' + req.query.shop +'/admin/products.json';

        const options = {
            method:'POST',
            uri: url,
            json: true,
            resolveWithFullResponse: true,
            headers: {
                'X-Shopify-Access-Token': process.env.appStoreTokenTest,
                'content-type': 'application/json'
            },
            body: new_product
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