const express = require("express");
const { getSubscriptions, createSubscription, deleteSubscription } = require("../controllers/subscriptionController");

const router = express.Router();

router.get("/", getSubscriptions); 
router.post("/", createSubscription); 
router.delete("/:id", deleteSubscription); 

module.exports = router;
