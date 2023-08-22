const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  user1_id: {
    type: String,
    required: true,
  },
  user2_id: {
    type: String,
    required: true,
  },
  messages: [
    {
      author_id: {
        type: String,
        required: true,
      },
      author: {
        type: "String",
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: new Date(),
      },
    },
  ],
});

module.exports = mongoose.model("Conversation", conversationSchema);
