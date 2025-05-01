const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const MiniScreen = require('../models/MiniScreen');
const Gallery = require('../models/Gallery');

// @route   GET api/miniscreen
// @desc    Get all mini screens
router.get('/', async (req, res) => {
    try {
        const miniscreens = await MiniScreen.find().populate('createdBy', ['name', 'email']);
        res.json(miniscreens);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/miniscreen
// @desc    Create or update mini screen
router.post('/', auth, async (req, res) => {
    const { screenId, title, content, businessOwner } = req.body;

    try {
        let miniscreen = await MiniScreen.findOne({ screenId });

        if (miniscreen) {
            // Update existing
            miniscreen.title = title;
            miniscreen.content = content;
            miniscreen.businessOwner = businessOwner;

            await miniscreen.save();
            return res.json(miniscreen);
        }

        // Create new
        miniscreen = new MiniScreen({
            screenId,
            title,
            content,
            businessOwner,
            createdBy: req.user.id
        });

        await miniscreen.save();
        res.json(miniscreen);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/miniscreen/:id
// @desc    Get mini screen by ID
router.get('/:id', async (req, res) => {
    try {
        const miniscreen = await MiniScreen.findOne({ screenId: req.params.id })
            .populate('createdBy', ['name', 'email'])
            .populate('gallery');

        if (!miniscreen) {
            return res.status(404).json({ msg: 'Mini screen not found' });
        }

        res.json(miniscreen);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Mini screen not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;
