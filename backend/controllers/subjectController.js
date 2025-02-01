const Subject = require('../models/Subject');

exports.getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find()
            .populate({
                path: 'chapters',
                model: 'Chapter',
                populate: {
                    path: 'topics',
                    model: 'Topic',
                },
            });
        res.json(subjects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getSubjectByCode = async (req, res) => {
    try {
        const subject = await Subject.findOne({ subjectCode: req.params.subjectCode })
            .populate({
                path: 'chapters',
                model: 'Chapter',
                populate: {
                    path: 'topics',
                    model: 'Topic',
                },
            });
        res.json(subject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
