const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema(
  {
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
        authorImg: {
          type: String,
          required: false,
        },
        createdAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);
