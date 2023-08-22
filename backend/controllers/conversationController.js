const Conversation = require("../models/conversation");

exports.get_conversation = async (req, res) => {
  const { user1_id, user2_id } = req.body;

  try {
    const conversation = await Conversation.findOne({
      $or: [
        { user1_id, user2_id },
        { user1_id: user2_id, user2_id: user1_id },
      ],
    });

    if (conversation) {
      res.status(200).json(conversation);
    } else {
      res
        .status(200)
        .json({ msg: "There are no messages in this conversation yet ..." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.add_message = async (req, res) => {
  const { user1_id, user2_id, author, content } = req.body;

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
            messages: { author_id: user1_id, author, content },
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
