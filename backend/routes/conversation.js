const express = require("express");
const router = express.Router();
const conversationController = require("../controllers/conversationController");
const requireAuth = require("../middleware/requireAuth");

// require auth for all conversation routes
router.use(requireAuth);

// #1 Conversations
router.get("/", conversationController.get_conversations);

router.post("/", conversationController.get_conversation);

// #2 Conversation's Messages
router.post("/add_message", conversationController.add_message);

router.delete("/delete_message", conversationController.delete_message);

module.exports = router;
