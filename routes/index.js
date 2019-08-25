var routerIndex = require('express').Router();
var routerGroup = require('express').Router();
var inventoryController = require('../controllers/inventory');
var checkController     = require('../controllers/check');
var fetchController     = require('../controllers/fetch');

/*
 * api/inventory
 */
routerGroup.get('/', inventoryController.index);

routerGroup.get('/inventorys', inventoryController.view);

routerGroup.post('/inventorys', inventoryController.new);

routerGroup.get('/inventorys/:id', inventoryController.details);

routerGroup.put('/inventorys/:id', inventoryController.update);

routerGroup.delete('/inventorys/:id', inventoryController.delete);

/*
 * api/check
 */
routerGroup.get('/check', checkController.check);

routerGroup.get('/check-list', checkController.checkList);

/*
 * api/fetch
 */
routerGroup.put('/fetch', fetchController.fetch);

/*
 * Entry point
 */
routerIndex.use('/api', routerGroup);

module.exports = routerIndex;