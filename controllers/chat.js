const { Conversation } = require('../models/conversation');
const { getChatbotResponse } = require('../services/chatbot');

const chatHandler = async (req, res) => {
    const userMessage = req.body.message;
    const conversationHistory = await Conversation.findAll();
    let conversationData = [];
    conversationHistory.forEach(conv => {
        conversationData.push({role: "user", content: conv.userMessage});
        conversationData.push({role: "assistant", content: conv.botResponse});
    });
    try{
        const botResponse = await getChatbotResponse(userMessage, conversationData);
        await Conversation.create({ userMessage, botResponse });
        res.json({ message: botResponse });
    
    }
    catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { chatHandler };