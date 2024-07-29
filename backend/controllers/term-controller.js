const Term = require('../models/termSchema.js');

const termCreate = async (req, res) => {
    try {
        const term = new Term(req.body)
        const result = await term.save()
        res.send(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

const termList = async (req, res) => {
    try {
        let terms = await Term.find({ school: req.params.id })
        if (terms.length > 0) {
            res.send(terms)
        } else {
            res.send({ message: "No terms found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { termCreate, termList };
