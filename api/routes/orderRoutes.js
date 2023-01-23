const express = require('express');
const router = express.Router();
const AUTHENTICATED = require('../middleware/AUTHENTICATED');
const orderController = require('../controllers/orderController')


router.get('/',
    AUTHENTICATED,
    orderController.Orders_GET_ReadAll);

router.post('/',
    AUTHENTICATED,
    orderController.Orders_POST_Create);

router.get('/:orderId',
    AUTHENTICATED,
    orderController.Orders_GET_ReadById);

router.patch('/:orderId',
    AUTHENTICATED,
    orderController.Orders_PATCH_Update);

router.delete('/:orderId',
    AUTHENTICATED,
    orderController.Orders_DELETE_Delete);


module.exports = router;
