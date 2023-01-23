const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const AUTHENTICATED = require('../middleware/AUTHENTICATED');



router.post("/signup", userController.Users_POST_SignUp);

router.delete('/:userId', userController.Users_DELETE_Delete);

router.post('/login', AUTHENTICATED, userController.Users_POST_Login);

module.exports = router;