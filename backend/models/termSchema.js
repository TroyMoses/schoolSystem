const mongoose = require("mongoose");

const termSchema = new mongoose.Schema({
    termName: {
        type: String,
        required: true,
    },
    year: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'year'
    },
}, { timestamps: true });

module.exports = mongoose.model("term", sclassSchema);

