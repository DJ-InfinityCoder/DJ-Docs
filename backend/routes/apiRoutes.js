const express = require('express');
const router = express.Router();

const { getSubjects, getSubjectByCode } = require('../controllers/subjectController');
const { getChapterByCode } = require('../controllers/chapterController');
const { getTopicById } = require('../controllers/topicController');

// Routes
router.get('/api', getSubjects);
router.get('/api/:subjectCode', getSubjectByCode);
router.get('/api/:subjectCode/:chapterCode', getChapterByCode);
router.get('/api/:subjectCode/:chapterCode/:topicId', getTopicById);

module.exports = router;
