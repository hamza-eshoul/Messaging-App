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
  const { user1_id, user2_id } = req.params;

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

exports.add_conversation_message = async (req, res) => {
  const { user2_id, author, content, authorImage } = req.body;

  const user1_id = req.user._id;

  try {
    const conversationExists = await Conversation.findOne({
      $or: [
        { user1_id, user2_id },
        { user1_id: user2_id, user2_id: user1_id },
      ],
    });

    // Push message to existing conversation
    if (conversationExists) {
      const addedMessage = await Conversation.findByIdAndUpdate(
        conversationExists._id,
        {
          $push: {
            messages: { author_id: user1_id, author, content, authorImage },
          },
        },
        { new: true }
      );

      await addedMessage.save();

      res.status(200).json(addedMessage);
    }

    // Create new conversation with a first message
    if (!conversationExists) {
      const newConversation = await new Conversation({
        user1_id,
        user2_id,
        messages: [
          {
            author_id: user1_id,
            author,
            content,
            authorImage,
          },
        ],
      });

      await newConversation.save();

      res.status(200).json(newConversation);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete_conversation_message = async (req, res) => {
  const { user2_id, message_id } = req.body;

  const user1_id = req.user._id;

  try {
    const conversation = await Conversation.findOne({
      $or: [
        { user1_id, user2_id },
        { user1_id: user2_id, user2_id: user1_id },
      ],
    });

    const updatedConversation = await Conversation.findByIdAndUpdate(
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

    res.status(200).json(updatedConversation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
