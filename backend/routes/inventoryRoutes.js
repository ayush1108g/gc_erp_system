// In equipmentRoutes.js or a similar routes file
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Route for adding inventory item issue
router
    .route('/')
    .get(inventoryController.getAllInventory)
    .post(inventoryController.addInventoryIssue)
    .patch(inventoryController.updateInventoryItem);

router.post('/add', inventoryController.addInventoryItem);

// Route for deleting inventory item issue
router
    .route('/:equipmentId')
    .get(inventoryController.getEquipmentById)
    .delete(inventoryController.deleteInventoryIssue);

module.exports = router;
