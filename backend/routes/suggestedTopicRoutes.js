const express = require("express");
const { getSuggestedTopics, createSuggestedTopic, deleteSuggestedTopic } = require("../controllers/suggestedTopicController");

const router = express.Router();

router.get("/", getSuggestedTopics); 
router.post("/", createSuggestedTopic); 
router.delete("/:id", deleteSuggestedTopic); 

module.exports = router;
