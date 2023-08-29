const express = require("express");
const router = express.Router();
const conversationController = require("../controllers/conversationController");

// get all conversations
router.get("/", conversationController.get_conversations);

// get a conversation
router.post("/", conversationController.get_conversation);

// add message
router.post("/add_message", conversationController.add_message);

// delete message
router.delete("/delete_message", conversationController.delete_message);

module.exports = router;
