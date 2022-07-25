const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer')

router.get('/', controller.AllCustomer)
router.get('/:id', controller.OneCustomer)
router.post('/', controller.AddCustomer)
router.delete('/:id', controller.DeleteCustomer)
router.put('/:id', controller.UpdateCustomer)

module.exports = router;
