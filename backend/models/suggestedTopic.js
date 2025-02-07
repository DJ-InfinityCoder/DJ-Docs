const mongoose = require("mongoose");

const suggestedTopicSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  topicName: { type: String, required: true },
  description: { type: String },
});

const SuggestedTopic = mongoose.model("SuggestedTopic", suggestedTopicSchema);

module.exports = SuggestedTopic;
