var mongoose  = require('mongoose'),
    Inventory = mongoose.model('Inventory');

exports.fetch = async function (req, res, next) {
    var result = await Inventory.findOneAndUpdate( {state: 1, p_info: req.body.p_info}, {state: 0} ).exec();

    if (result)
        result = true;
    else
        result = false;

    return res.json({
        result: result
    });
}