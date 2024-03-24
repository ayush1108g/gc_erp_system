// In equipmentRoutes.js or a similar routes file
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Route for adding inventory item issue
router.post('/', inventoryController.addInventoryIssue);
router.patch('/',inventoryController.updateInventoryItem);
router.post('/add', inventoryController.addInventoryItem);

// Route for deleting inventory item issue
router
    .route('/:equipmentId')
    .delete(inventoryController.deleteInventoryIssue);

module.exports = router;
