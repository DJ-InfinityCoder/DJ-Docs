const Subscription = require("../models/subscriptionSchema");

exports.getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.createSubscription = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const existingSubscription = await Subscription.findOne({ email });
    if (existingSubscription) {
      return res.status(400).json({ message: "Email is already subscribed" });
    }

    const newSubscription = new Subscription({ name, email });
    await newSubscription.save();

    res.status(201).json({ message: "Subscription successful", newSubscription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSubscription = await Subscription.findByIdAndDelete(id);
    if (!deletedSubscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.json({ message: "Subscription deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
