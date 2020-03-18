const path = require('path');

module.exports = (req, res)=>{
    let app = req.query.app
    let shop = req.query.shop
    const url = 'https://'+ shop +`/admin/apps/${app}`;
res.sendFile(path.join(__dirname,'..', 'views', 'index.html'));
    return next();
}