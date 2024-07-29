const mongoose = require("mongoose");

const yearSchema = new mongoose.Schema({
    yearName: {
        type: String,
        required: true,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("year", yearSchema);

