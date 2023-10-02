
const express = require('express');
const router = express.Router();
const fileUploadController = require('../controllers/fileController');
const auth = require('../middleware/requireJWT');
const isAdmin = require('../middleware/isAdmin');
const { find } = require('../models/filesModel');

router.post('/upload', auth, fileUploadController.uploadFile, fileUploadController.saveFile);
router.get('/userFiles',auth, fileUploadController.findFiles);
router.get('/adminUserFiles',auth,isAdmin,fileUploadController.findAllFilesByUser);
router.delete('/:fileId',auth, fileUploadController.deleteFile);

module.exports = router;