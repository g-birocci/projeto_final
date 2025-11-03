const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const ConversationSchema = new Schema(
  {
    itemId: { type: Types.ObjectId, ref: 'Product', required: true },
    // guarde os participantes jÃ¡ em ordem estÃ¡vel no controller
    participants: [{ type: Types.ObjectId, ref: 'User', required: true }],
    lastMessageAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// um chat por item + par de usuÃ¡rios
ConversationSchema.index({ itemId: 1, participants: 1 });

const Conversation =
  mongoose.models.Conversation || mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation;



