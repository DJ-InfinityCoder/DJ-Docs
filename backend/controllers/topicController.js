const Topic = require('../models/Topic');

exports.getTopicById = async (req, res) => {
    try {
        const topic = await Topic.findOne({ topicId: req.params.topicId })
            .populate('chapter'); // Include parent chapter details if required
        res.json(topic);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
