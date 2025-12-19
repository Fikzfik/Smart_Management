const multer = require('multer');
const path = require('path');
const response = require('../../utils/response');
const User = require('./user.model');

// Set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        );
    },
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
}).single('photo');

exports.uploadPhoto = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return response(res, 400, false, err);
        } else {
            if (req.file == undefined) {
                return response(res, 400, false, 'No file selected');
            } else {
                try {
                    await User.findByIdAndUpdate(req.user.id, { photo: req.file.filename });
                    return response(res, 200, true, 'Photo uploaded', {
                        file: `uploads/${req.file.filename}`,
                    });
                } catch (error) {
                    return response(res, 500, false, error.message);
                }
            }
        }
    });
};
