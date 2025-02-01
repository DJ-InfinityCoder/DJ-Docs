const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
    topicId: { type: String, required: true },
    topicName: { type: String, required: true },
    contentList: { type: Array, required: true },
    mainContent: { type: Array, required: true },
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
});

module.exports = mongoose.model('Topic', TopicSchema);
