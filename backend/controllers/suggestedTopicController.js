const SuggestedTopic = require("../models/suggestedTopic");

exports.getSuggestedTopics = async (req, res) => {
  try {
    const suggestedTopics = await SuggestedTopic.find();
    res.json(suggestedTopics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSuggestedTopic = async (req, res) => {
  try {
    const { username, email, topicName, description } = req.body;

    if (!username || !email || !topicName || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newSuggestedTopic = new SuggestedTopic({ username, email, topicName, description });
    await newSuggestedTopic.save();

    res.status(201).json({ message: "Suggested topic submitted successfully", newSuggestedTopic });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSuggestedTopic = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSuggestedTopic = await SuggestedTopic.findByIdAndDelete(id);
    if (!deletedSuggestedTopic) {
      return res.status(404).json({ message: "Suggested topic not found" });
    }

    res.json({ message: "Suggested topic deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
