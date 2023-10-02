const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: String,
    content: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    originalname: String, 
    mimetype: String,     
    size: Number,         
    uploadDate: {
        type: Date,
        default: Date.now
    }
});

const File = mongoose.model('File', fileSchema);

module.exports = File;