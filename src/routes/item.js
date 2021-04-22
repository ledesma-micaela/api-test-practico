const express = require('express');
const itemsController = require('../controllers/item');

const router = express.Router();

router.get('/', itemsController.getFilteredItems);
router.get('/:id', itemsController.getItemDetails);

module.exports = router;
