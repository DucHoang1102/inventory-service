var mongoose  = require('mongoose'),
    Inventory = mongoose.model('Inventory');

exports.check = async function (req, res, next) {
    var result = await Inventory.findOne( {state: 1, temp: 0, p_info: req.body.p_info} ).exec();

    if (result) 
        result = true;
    else 
        result = false;

    return res.json({
        result: result
    });
}

exports.checkList = async function (req, res, next) {
    var results = [];

    if (!Array.isArray(req.body.p_info_list)) {
        req.body.p_info_list = [];
    }

    // Reset temp = 0
    await Inventory.updateMany( {state: 1}, {temp: 0} );

    for (let p_info of req.body.p_info_list)
    {
        var inventorys = await Inventory.findOneAndUpdate( {state: 1, temp: 0, p_info: p_info}, {temp: 1} ).exec();
        
        if (inventorys)
            results.push(true);
        else 
            results.push(false); 
    }

    return res.json({
        results: results
    });
}