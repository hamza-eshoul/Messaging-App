const Conversation = require("../models/conversation");

exports.get_conversations = async (req, res) => {
  try {
    const conversations = await Conversation.find();

    res.status(200).json(conversations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.get_conversation = async (req, res) => {
  const { user1_id, user2_id } = req.body;

  try {
    const conversation = await Conversation.findOne({
      $or: [
        { user1_id, user2_id },
        { user1_id: user2_id, user2_id: user1_id },
      ],
    });

    res.status(200).json(conversation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.add_message = async (req, res) => {
  const { user1_id, user2_id, author, content, authorImg } = req.body;

  try {
    // Check if conversation exists
    const exists = await Conversation.findOne({
      $or: [
        { user1_id, user2_id },
        { user1_id: user2_id, user2_id: user1_id },
      ],
    });

    // Push message to existing conversation
    if (exists) {
      const pushedMessage = await Conversation.findByIdAndUpdate(
        exists._id,
        {
          $push: {
            messages: { author_id: user1_id, author, content, authorImg },
          },
        },
        { new: true }
      );

      await pushedMessage.save();

      res.status(200).json(pushedMessage);
    }
    // Create new conversation with a first message
    else {
      const conversation = await new Conversation({
        user1_id,
        user2_id,
        messages: [
          {
            author_id: user1_id,
            author,
            content,
            authorImg,
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

exports.delete_message = async (req, res) => {
  const { user1_id, user2_id, message_id } = req.body;

  try {
    const conversation = await Conversation.findOne({
      $or: [
        { user1_id, user2_id },
        { user1_id: user2_id, user2_id: user1_id },
      ],
    });

    const updateConversationMessages = await Conversation.findByIdAndUpdate(
      conversation._id,
      {
        $pull: {
          messages: {
            _id: message_id,
          },
        },
      },
      { new: true }
    );

    res.status(200).json(updateConversationMessages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
