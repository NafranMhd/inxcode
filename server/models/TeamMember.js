const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        trim: true,
    },
    department: {
        type: String,
        required: [true, 'Department is required'],
        trim: true,
    },
    image: {
        type: String,
        default: '',
    },
    bio: {
        type: String,
        maxlength: [300, 'Bio cannot exceed 300 characters'],
    },
    social: {
        linkedin: { type: String, default: '' },
        twitter: { type: String, default: '' },
        github: { type: String, default: '' },
        dribbble: { type: String, default: '' },
    },
    order: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('TeamMember', TeamMemberSchema);
