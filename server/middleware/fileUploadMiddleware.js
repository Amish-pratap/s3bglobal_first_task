// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Define the folder where uploaded files will be stored
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname); // Define the file naming strategy
//     },
// });

// const upload = multer({ storage });

// module.exports = upload;