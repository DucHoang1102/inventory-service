var mongoose  = require('mongoose'),
    Inventory = mongoose.model('Inventory');

exports.fetch = function (req, res, next) {
    return res.json({
        message: 'Ok fetch'
    });
}