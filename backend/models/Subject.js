const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    subjectCode: { type: String, required: true, unique: true },
    subjectName: { type: String, required: true },
    subjectIntroContent: { type: Array, required: true },
    chapters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chapter',
        },
    ],
});

module.exports = mongoose.model('Subject', SubjectSchema);
