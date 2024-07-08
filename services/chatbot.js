const axios = require('axios');
const { OpenAI } = require('openai');
const fs = require('fs');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config();
const { sendConfirmationEmail } = require('./emailService');    

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const getRoomOptions = async () => {
    try {
        const response = await axios.get('https://bot9assignement.deno.dev/rooms');
        return response.data;
    } catch (error) {
        console.error('Error fetching room options:', error);
        throw error; // Rethrow to handle it in the calling function
    }
};

const bookRoom = async (roomId, fullName, email, nights) => {
    try {
        const bookingData = {
            roomId: roomId,
            fullName: fullName,
            email: email,
            nights: nights
        }
        const response = await axios.post('https://bot9assignement.deno.dev/book', bookingData,{
            headers: {
                'Content-Type': 'application/json'
            }
        
        });
        console.log(response.data);
        await sendConfirmationEmail(email, response.data);
        return `Booking successful! Your booking ID is ${response.data.bookingId} and the total price is ${response.data.totalPrice}. Email confirmation has been sent to ${email}`;
    } catch (error) {
        console.error('Error booking room:', error);
        throw error; // Rethrow to handle it in the calling function
    }
};


let tools= JSON.parse(fs.readFileSync("services/tools.json", "utf-8"));

let prompt= fs.readFileSync("services/initialPrompt.txt", "utf-8");


const getChatbotResponse = async (message, conversationHistory) => {
    let allMessages = [
        {role: "system", content: prompt}, 
        ...conversationHistory,
        { role: "user", content: message }
    ];
    
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: allMessages,
        tools: tools,
        tool_choice: "auto"
    });
    
    const responseMessage = response.choices[0].message;
    allMessages.push(responseMessage);
    console.log(responseMessage);
    
    if (responseMessage.tool_calls){
        const tool_calls = responseMessage.tool_calls;
        const tool_call_id = tool_calls[0].id;
        const tool_function_name = tool_calls[0].function.name;
        const tool_parameters = JSON.parse(tool_calls[0].function.arguments);
    
        if(tool_function_name === "getRoomOptions"){
            const roomOptions = await getRoomOptions();
            
            allMessages.push({
                "role": "tool",
                "tool_call_id": tool_call_id,
                "name": tool_function_name,
                "content": JSON.stringify(roomOptions)
            });
    
            const responseAfterToolCall = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    {role: "system", content: prompt},
                    ...allMessages
                ]
            });
    
            let reply = responseAfterToolCall.choices[0].message;
            allMessages.push(reply);
            return reply.content;
        }
        else if(tool_function_name === "bookRoom"){
            console.log(tool_parameters);
            const { roomId, fullName, email, nights } = tool_parameters;
            const bookingConfirmation = await bookRoom(roomId, fullName, email, nights);
            
            allMessages.push({
                role: "tool",
                tool_call_id: tool_call_id,
                name: tool_function_name,
                content: JSON.stringify(bookingConfirmation)
            });
    
            const responseAfterToolCall = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: allMessages
            });
    
            return responseAfterToolCall.choices[0].message.content;
        }
        else{
            return "No functions found" + tool_function_name;
        }
    }
    return responseMessage.content;
};

module.exports = { getChatbotResponse };


