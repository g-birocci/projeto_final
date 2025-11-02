const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const MessageSchema = new Schema(
  {
    conversationId: { type: Types.ObjectId, ref: 'Conversation', required: true },
    senderId: { type: Types.ObjectId, ref: 'User', required: true },
    body: { type: String, required: true, trim: true },
    readBy: [{ type: Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

MessageSchema.index({ conversationId: 1, createdAt: -1 });

const Message =
  mongoose.models.Message || mongoose.model('Message', MessageSchema);

module.exports = Message;
