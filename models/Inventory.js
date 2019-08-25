var mongoose        = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

var InventorySchema = new mongoose.Schema({
    p_info: { },
    note  : { type: String },
    temp  : { type: Number, min: 0, max: 1, default: 0 },
    state : { type: Number, min: 0, max: 1, default: 1 }

}, { timestamps: true } );

InventorySchema.plugin(uniqueValidator, 'is already exist.');

mongoose.model('Inventory', InventorySchema);