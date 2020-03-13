module.exports = (req, res, next)=>{
    let shop = req.query.shop;
    res.render('app',{shop:shop});

    return next();
}