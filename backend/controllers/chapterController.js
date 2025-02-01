const Chapter = require('../models/Chapter');

exports.getChapterByCode = async (req, res) => {
    try {
        const chapter = await Chapter.findOne({ chapterCode: req.params.chapterCode })
            .populate({
                path: 'topics',
                model: 'Topic',
            })
            .populate('subject'); // Optional: Include subject details if required
        res.json(chapter);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
