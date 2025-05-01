const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const Gallery = require('../models/Gallery');
const MiniScreen = require('../models/MiniScreen');

// Multer configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const upload = multer({ storage: storage });

// @route   POST api/gallery
// @desc    Add image to gallery
router.post('/', [auth, upload.single('image')], async (req, res) => {
    const { miniScreenId } = req.body;

    try {
        const miniscreen = await MiniScreen.findOne({ screenId: miniScreenId });
        if (!miniscreen) {
            return res.status(404).json({ msg: 'Mini screen not found' });
        }

        const galleryItem = new Gallery({
            url: req.file.path,
            miniScreenId,
            uploadedBy: req.user.id
        });

        await galleryItem.save();

        miniscreen.gallery.push(galleryItem._id);
        await miniscreen.save();

        res.json(galleryItem);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
