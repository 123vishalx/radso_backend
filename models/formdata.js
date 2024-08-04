const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

const FormData = mongoose.model('FormData', formDataSchema);

module.exports = FormData;
