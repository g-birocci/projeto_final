const authController = require('./authController');

module.exports = {
  createConversation: authController.createConversation,
  listConversations: authController.listConversations,
  getMessages: authController.getMessages,
  sendMessage: authController.sendMessage,
  markAsRead: authController.markAsRead,
};

