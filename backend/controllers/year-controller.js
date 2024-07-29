const Year = require('../models/yearSchema.js');

const yearCreate = async (req, res) => {
    try {
        const year = new Year({
            yearName: req.body.yearName,
            school: req.body.adminID
        });

        const existingYearByName = await Year.findOne({
            yearName: req.body.yearName,
            school: req.body.adminID
        });

        if (existingYearByName) {
            res.send({ message: 'Sorry this year already exists' });
        }
        else {
            const result = await year.save();
            res.send(result);
        }
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

const getYearDetail = async (req, res) => {
    try {
        let year = await Year.findById(req.params.id);
        if (year) {
            year = await year.populate("school", "schoolName")
            res.send(year);
        }
        else {
            res.send({ message: "No year found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { yearCreate, yearList, getYearDetail };
