const Conversation = require("../models/conversation");

exports.get_conversation = async (req, res) => {
  const { user1_id, user2_id } = req.body;

  try {
    const conversation = await Conversation.findOne({ user1_id, user2_id });

    if (conversation) {
      res.status(200).json(conversation);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.add_message = async (req, res) => {
  const { user1_id, user2_id, content } = req.body;

  try {
    // Check if conversation exists
    const exists = await Conversation.findOne({ user1_id, user2_id });

    // Push message to existing conversation
    if (exists) {
      const pushMessage = await Conversation.findByIdAndUpdate(
        exists._id,
        {
          $push: {
            messages: { author: user1_id, content },
          },
        },
        { new: true }
      );

      await pushMessage.save();

      res.status(200).json(pushMessage);
    }
    // Create new conversation with a first message
    else {
      const conversation = await new Conversation({
        user1_id,
        user2_id,
        messages: [
          {
            author: user1_id,
            content,
          },
        ],
      });

      await conversation.save();

      res.status(200).json(conversation);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
