const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
    chapterCode: { type: String, required: true },
    chapterName: { type: String, required: true },
    chapterIntroContent: { type: Array, required: true },
    topics: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Topic',
        },
    ],
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
});

module.exports = mongoose.model('Chapter', ChapterSchema);
