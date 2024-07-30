const mongoose = require("mongoose");

const headTeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    from: {
        type: Number,
        required: true,
    },
    to: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("headTeacherComment", headTeacherSchema);

