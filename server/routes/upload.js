const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');

// @route   POST /api/upload
// @desc    Upload image
// @access  Protected
router.post('/', protect, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const imageUrl = `/uploads/${req.file.filename}`;

        res.status(201).json({
            success: true,
            data: {
                filename: req.file.filename,
                url: imageUrl,
                size: req.file.size,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
