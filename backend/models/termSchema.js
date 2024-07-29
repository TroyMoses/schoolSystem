const mongoose = require("mongoose");

const termSchema = new mongoose.Schema({
    termName: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
        required: true,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("term", termSchema);

