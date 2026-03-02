const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const TeamMember = require('../models/TeamMember');
const { protect } = require('../middleware/auth');

// @route   GET /api/team
// @desc    Get all team members
// @access  Public
router.get('/', async (req, res) => {
    try {
        const members = await TeamMember.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
        res.json({ success: true, count: members.length, data: members });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   GET /api/team/:id
// @desc    Get single team member
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const member = await TeamMember.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ success: false, message: 'Team member not found' });
        }
        res.json({ success: true, data: member });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   POST /api/team
// @desc    Add team member
// @access  Protected
router.post('/', protect, [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('role').trim().notEmpty().withMessage('Role is required'),
    body('department').trim().notEmpty().withMessage('Department is required'),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ success: false, errors: errors.array() });
        }

        const member = await TeamMember.create(req.body);
        res.status(201).json({ success: true, data: member });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   PUT /api/team/:id
// @desc    Update team member
// @access  Protected
router.put('/:id', protect, async (req, res) => {
    try {
        const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!member) {
            return res.status(404).json({ success: false, message: 'Team member not found' });
        }
        res.json({ success: true, data: member });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   DELETE /api/team/:id
// @desc    Delete team member
// @access  Protected
router.delete('/:id', protect, async (req, res) => {
    try {
        const member = await TeamMember.findByIdAndDelete(req.params.id);
        if (!member) {
            return res.status(404).json({ success: false, message: 'Team member not found' });
        }
        res.json({ success: true, message: 'Team member deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
