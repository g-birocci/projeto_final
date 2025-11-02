const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const ConversationSchema = new Schema(
  {
    itemId: { type: Types.ObjectId, ref: 'Products', required: true },
    // guarde os participantes já em ordem estável no controller
    participants: [{ type: Types.ObjectId, ref: 'User', required: true }],
    lastMessageAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// um chat por item + par de usuários
ConversationSchema.index({ itemId: 1, participants: 1 }, { unique: true });

const Conversation =
  mongoose.models.Conversation || mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation;
