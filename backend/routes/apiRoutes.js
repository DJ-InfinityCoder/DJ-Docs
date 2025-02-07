const express = require('express');
const router = express.Router();

const { getSubjects, getSubjectByCode } = require('../controllers/subjectController');
const { getChapterByCode } = require('../controllers/chapterController');
const { getTopicById } = require('../controllers/topicController');

// Routes
router.get('/', getSubjects);
router.get('/:subjectCode', getSubjectByCode);
router.get('/:subjectCode/:chapterCode', getChapterByCode);
router.get('/:subjectCode/:chapterCode/:topicId', getTopicById);

module.exports = router;
