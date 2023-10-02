const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const auth = require('../middleware/requireJWT')


router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/userinfo',auth, userController.getUserInfo);
router.get('/signout',auth,userController.signout);

module.exports = router;
