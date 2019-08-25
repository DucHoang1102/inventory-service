var mongoose  = require('mongoose'),
    Inventory = mongoose.model('Inventory');

exports.index = function (req, res, next) {
    return res.json({
        status: 'Inventory Service Api',
        message: 'Welcome'
    });
};

exports.view = function (req, res, next) {
    var limit  = String(req.body.limit)  || 20; // Why String()? Because case req.body.limit = 0 is Number
    var offset = String(req.body.offset) || 0;
    var query  = req.body.query          || {};
    var sort   = req.body.sort           || {createdAt: 'desc'};
    var select = req.body.select         || '';

    var results = Inventory.find(query)
        .select(select)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort(sort)
        .exec();

    Promise.all([results]).then(results => {
        var inventorys = results[0]
        return res.json({
            inventorys: inventorys
        });

    }).catch( err => res.json({ errors: err.message }) );
};

exports.new = function (req, res, next) {
    var inventory = new Inventory(req.body.inventory);

    inventory.save().then(result => {
        return res.json({
            inventorys: result
        });

    }).catch( err => res.json({ errors: err.message }) );
};

exports.details = function (req, res, next) {
    Inventory.findById(req.params.id).then(result => {
        if (!result) throw Error('Inventory not found');

        return res.json({
            inventorys: result
        });

    }).catch( err => res.json({ errors: err.message }) );
};

exports.update = function (req, res, next) {
    Inventory.findById(req.params.id).then(result => {
        if (!result) throw Error('Inventory not found');

        if (typeof req.body.inventory.p_info !== 'undefined') {
            result.p_info = req.body.inventory.p_info;
        }

        if (typeof req.body.inventory.note !== 'undefined') {
            result.note = req.body.inventory.note;
        }

        if (typeof req.body.inventory.state !== 'undefined') {
            result.state = req.body.inventory.state;
        }

        result.save().then(result => {
            return res.json({
                inventorys: result
            });

        }).catch( err => res.json({ errors: err.message }) )

    }).catch( err => res.json({ errors: err.message }) );
};

exports.delete = function (req, res, next) {
    Inventory.findByIdAndRemove(req.params.id).then(result => {
        if (!result) throw Error('Inventory not found');

        return res.json({
            inventorys: result
        });

    }).catch( err => res.json({ errors: err.message }) );
};
