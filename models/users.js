const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    clerk_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: false,
        default: null
    },
    email: {
        type: String,
        required: false,
        unique: true,
        default: null
    },
    phone: {
        type: String,
        required: false,
        unique: true,
        default: null
    },
    ip_address: {
        type: String,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
