const express = require("express");
const router = express.Router();
const conversationController = require("../controllers/conversationController");
const requireAuth = require("../middleware/requireAuth");

// require auth for all conversation routes
router.use(requireAuth);

// get all conversations
router.get("/", conversationController.get_conversations);

// get a conversation
router.get("/:user1_id/:user2_id", conversationController.get_conversation);

// add message
router.post("/message", conversationController.add_conversation_message);

// delete message
router.delete("/message", conversationController.delete_conversation_message);

module.exports = router;
