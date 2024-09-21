const mongoose = require('mongoose');

const chathistorySchema = new mongoose.Schema({
    user: {  type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'
     },
    summary_id: { type: Number, required: true },
    chathistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
    created_at: { type: Date, default: Date.now },
});

const ChatHistory = mongoose.model('ChatHistory', chathistorySchema);

module.exports = ChatHistory;
