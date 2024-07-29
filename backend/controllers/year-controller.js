const Year = require('../models/yearSchema.js');

const yearCreate = async (req, res) => {
    try {
        const year = new Year(req.body)
        const result = await year.save()
        res.send(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

const yearList = async (req, res) => {
    try {
        let years = await Year.find({ school: req.params.id })
        if (years.length > 0) {
            res.send(years)
        } else {
            res.send({ message: "No years found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { yearCreate, yearList };
