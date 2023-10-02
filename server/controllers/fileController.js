const multer = require('multer');
const File = require('../models/filesModel');
// const { promisify } = require('util')
// const fs = require('fs')
// const path = require('path');
// const unlinkAsync = promisify(fs.unlink)



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

exports.uploadFile = upload.single('file');

exports.saveFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { filename, originalname, mimetype, size } = req.file;
        const user = req.user;

        const newFile = new File({
            filename,
            content: originalname,
            user: user.userId,
            originalname,
            mimetype,
            size,
            uploadDate: Date.now(),
        });

        await newFile.save();

        res.status(201).json({ message: 'File uploaded successfully', filename, originalname });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.findFiles = async (req, res) => {
    try {
        const userId = req.user.userId;
        const files = await File.find({ user: userId }).exec();

        res.status(200).json({ message: 'Files retrieved successfully', files });
    } catch (error) {
        console.error("Error finding files", error);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.findAllFilesByUser = async (req, res) => {
    try {
        const filesByUser = await File.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'userDetails',
                },
            },
            {
                $unwind: '$userDetails',
            },
            {
                $group: {
                    _id: '$userDetails.username',
                    files: {
                        $push: {
                            _id: '$_id',
                            filename: '$filename',
                            originalname: '$originalname',
                            mimetype: '$mimetype',
                            size: '$size',
                            uploadDate: '$uploadDate',
                        },
                    },
                },
            },
        ]).exec();
        res.status(200).json({ message: 'Files grouped by user retrieved successfully', filesByUser });
    } catch (error) {
        console.error("Error finding files grouped by user", error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteFile = async (req, res) => {
    try {
        const fileId = req.params.fileId;

        const fileToDelete = await File.findById(fileId);

        if (!fileToDelete) {
            return res.status(404).json({ error: 'File not found' });
        }

        await File.findByIdAndDelete(fileId);

        res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error("Error deleting file", error);
        res.status(500).json({ error: 'Server error' });
    }
};