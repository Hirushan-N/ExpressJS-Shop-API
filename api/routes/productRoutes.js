const express = require('express');
const router = express.Router();
const multer = require('multer') //npm install --save multer
const AUTHENTICATED = require('../middleware/AUTHENTICATED');
const productController = require('../controllers/productController')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Max size 5MB
    },
    fileFilter: fileFilter
});




router.get('/',
    productController.Products_GET_ReadAll);

router.post('/',
    AUTHENTICATED,
    upload.single('productImage'),
    productController.Products_POST_Create);

router.get('/:productId',
    productController.Products_GET_ReadById);

router.patch('/:productId',
    AUTHENTICATED,
    productController.Products_PATCH_Update);

router.delete('/:productId',
    AUTHENTICATED,
    productController.Products_DELETE_Delete);


module.exports = router;
