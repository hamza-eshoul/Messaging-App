const express = require("express");
const router = express.Router();
const conversationController = require("../controllers/conversationController");

// get a conversation
router.post("/", conversationController.get_conversation);

// add a message to a conversation
router.post("/add_message", conversationController.add_message);

module.exports = router;
