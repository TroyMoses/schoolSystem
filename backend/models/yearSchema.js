const mongoose = require("mongoose");

const yearSchema = new mongoose.Schema({
    yearName: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("year", yearSchema);

