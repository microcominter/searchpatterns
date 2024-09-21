const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    summary_id: { type: Number, required: true },
    user: {  type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'
     },
     images:[{ type: String,default:null }],
     relatedQuestions:[{ type: String,default:null }],
    prompt: { type: String, required: true },
    answer: { type: String, required: true },
    summary:{ type: String,default:null },
    sources: [{ 
        name: { type: String, default: null },
        url: { type: String, default: null }
    }],
    created_at: { type: Date, default: Date.now },
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
