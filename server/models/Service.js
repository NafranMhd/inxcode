const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    features: {
        type: [String],
        required: [true, 'At least one feature is required'],
    },
    icon: {
        type: String,
        default: '',
    },
    color: {
        type: String,
        default: '#0ea5e9',
    },
    category: {
        type: String,
        enum: ['software', 'education'],
        required: [true, 'Category is required'],
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

module.exports = mongoose.model('Service', ServiceSchema);
