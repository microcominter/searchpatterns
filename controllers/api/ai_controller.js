const axios=require('axios');
// Simulate a database for storing conversation history and summaries
const ChatHistory=require('../../models/chathistory');
const Chat=require('../../models/chat');

const Groq = require('groq-sdk');
const redisClient = require('../../config/redis');
let conversations = [];
let summaries = [];
const groq = new Groq({ apiKey: `${process.env.GROQ_API_KEY}` });
// Middleware to check if the API key is valid
// const validateApiKey = (req, res, next) => {
//     const apiKey = req.headers['authorization'];
//     if (apiKey === `Bearer ${process.env.GROQ_API_KEY}`) {
//         next();
//     } else {
//         res.status(403).json({ error: 'Invalid API key' });
//     }
// };
SERPER_API = `${process.env.SERPER_API}`
SERPER_SEARCH_ENDPOINT = "https://google.serper.dev/search"
REFERENCE_COUNT = 15
DEFAULT_SEARCH_ENGINE_TIMEOUT = 5000
GROQ_API = "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"

const _rag_query_text = `
You are a knowledgeable AI assistant built by Search Patterns. Your task is to provide informative and accurate answers to user questions. You have access to relevant context, but you should also leverage your own extensive knowledge to provide comprehensive responses.

Guidelines:
1. Use the provided context as a starting point, but don't limit yourself to it.
2. Incorporate your own knowledge to expand on the topic and provide additional insights.
3. Aim for a balanced response that combines context-specific information with broader understanding.
4. If the context is insufficient or contradicts your knowledge, rely on your own understanding but mention any discrepancies.
5. Provide a thorough answer, aiming for around 150-200 words unless the question requires a more concise response.
6. Maintain a professional and unbiased tone.
7. Never ever show any citations in your answers or any signs that you are giving response through an external context.

Remember, your goal is to give the most helpful and accurate answer possible by synthesizing the provided context with your own extensive knowledge.

Here is the relevant context:
`;

const _summary_query_text = `
You are a large language AI assistant built by Search Patterns. You are given a set of related contexts to the question, and please write a brief, concise, and accurate summary of the contexts provided. Your summary should be no longer than 50 words.

Remember, don't blindly repeat the contexts. Here are the contexts:
`;

const _more_questions_prompt = `
You are a helpful assistant that helps the user to ask related questions, based on the user's original question and the related contexts. Please identify worthwhile topics that can be follow-ups, and write questions no longer than 20 words each. Please make sure that specifics, like events, names, locations, are included in follow-up questions so they can be asked standalone. For example, if the original question asks about "the Manhattan project", in the follow-up question, do not just say "the project", but use the full name "the Manhattan project". The format of giving the responses and generating the questions should be like this:

1. [Question 1]
2. [Question 2] 
3. [Question 3]
4. [Question 4]
5. [Question 5]

Here are the contexts of the question:

{context}

Remember, based on the original question and related contexts, suggest five such further questions. Do NOT repeat the original question. Each related question should be no longer than 20 words. Here is the original question:
`;
// let data = JSON.stringify({
//     "q": "apple inc",
//     "location": "India",
//     "gl": "in"
//   });
  
//   let config = {
//     method: 'post',
//     url: 'https://google.serper.dev/search',
//     headers: { 
//       'X-API-KEY': '729640657296e51b6a87b0b3f44f663ee621b9c4', 
//       'Content-Type': 'application/json'
//     },
//     data : data
//   };
  
//   axios(config)


async function searchWithSerper(query) {
    const cacheKey = `serper:${query}`;
    
    // Try to get cached result
    const cachedResult = await redisClient.get(cacheKey);
    if (cachedResult) {
        return JSON.parse(cachedResult);
    }

    const payload = {
        q: query,
        location: 'India',
        gl:"in"
    };
    
    const headers = { 
        'X-API-KEY': '729640657296e51b6a87b0b3f44f663ee621b9c4', 
        'Content-Type': 'application/json'
    };
    try {
        const response = await axios.post(SERPER_SEARCH_ENDPOINT, payload, { headers, timeout: DEFAULT_SEARCH_ENGINE_TIMEOUT });
        const jsonContent = response.data;
        
        let contexts = [];
        let images=[];
        if (jsonContent.knowledgeGraph) {
                const url = jsonContent.knowledgeGraph.descriptionUrl || jsonContent.knowledgeGraph.website;
            const snippet = jsonContent.knowledgeGraph.description;
            if(jsonContent.knowledgeGraph.imageUrl){
                images.push(jsonContent.knowledgeGraph.imageUrl);
            }
            if (url && snippet) {
                contexts.push({ name: jsonContent.knowledgeGraph.title || "", url, snippet });
            }
        }
        if (jsonContent.answerBox) {
                const url = jsonContent.answerBox.url;
                const snippet = jsonContent.answerBox.snippet || jsonContent.answerBox.answer;
                if (url && snippet) {
                        contexts.push({ name: jsonContent.answerBox.title || "", url, snippet });
                    }
                }
                if(jsonContent.topStories){
                        jsonContent.topStories.forEach((story) => {
                                images.push(story.imageUrl);
                            })
                        }
        if (jsonContent.images) {
            jsonContent.images.forEach((story)=>{
                images.push(story.imageUrl);
            });
        
        
        }
                        contexts = contexts.concat(jsonContent.organic.map(c => ({ name: c.title, url: c.link, snippet: c.snippet || "" })));
                        const result = { contexts: contexts.slice(0, 10), images };

                        // Cache the result for 1 hour
                        await redisClient.setEx(cacheKey, 3600, JSON.stringify(result));

                        return result;
                    } catch (error) {
                        console.log(error);
                        
        throw new Error("Search engine error.");
    }
}

class AI {
    static async aiGroq(system_prompt, query,conversation) {
        const cacheKey = `groq:${system_prompt}:${query}`;
        
        // Try to get cached result
        const cachedResult = await redisClient.get(cacheKey);
        if (cachedResult) {
            return JSON.parse(cachedResult);
        }

        const groq = new Groq({ apiKey: GROQ_API });

        try {
            const chatCompletion = await groq.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: system_prompt
                    },
                    {
                        role: 'user',
                        content: query
                    }
                ],
                model: 'llama3-70b-8192',
                temperature: 0.5,
                max_tokens: 1024,
                top_p: 1,
                stream: false,
                stop: null
            });

            const result = chatCompletion.choices[0].message.content;

            // Cache the result for 1 hour
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(result));

            return result;
        } catch (error) {
            console.error('Error during API call:', error);
            throw error;
        }
    }
}

function getRelatedQuestions(query, contexts) {
    const systemPrompt = _more_questions_prompt.replace("{context}", contexts.map(c => c.snippet).join("\n\n"));
    return AI.aiGroq(systemPrompt, query);
}

function generateSummary(query, contexts) {
    const systemPrompt = _summary_query_text + contexts.map(c => c.snippet).join("\n\n");
    return AI.aiGroq(systemPrompt, query);
}

module.exports.getspecificCHatHistory=async function (req,res){
    const { summary_id } = req.body;
    let chat=await Chat.find({summary_id});
     res.json({mssg:chat,success:"success"});
}
module.exports.getChatHistory=async function(req,res){
   
    let chat=await ChatHistory.find({user:req.user.userId}).populate("chathistory");
    let chatHistory = chat.map(c => c.chathistory);
        res.json({ success: "success", mssg: chatHistory });
}
module.exports.getContext=async function (req,res){
    console.log("post request recieved");
    
    const { prompt } = req.body;
    try {
        const {contexts,images} = await searchWithSerper(prompt);
        req.session.contexts = contexts;
        req.session.images=images;
        res.json({
            sources: contexts.map(c => c.url),
            contexts,
            images
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}



module.exports.getAnswer = async function (req, res) {
    let prompt = req.body.prompt;
    let summaryId = req.body.summary_id;
    let contexts=[];
    let images=[];
        try{
            const res= await searchWithSerper(prompt);
            if(res){
                contexts=res.contexts;
                images=res.images;
                console.log("res",res)
            }
        }
        catch(error){
            contexts=[]
            images=[]
            console.log("error occured while fetching context".error);

            }   

    try {
        let conversation = [];
        let existingChatHistory = null;

        if (summaryId) {
            const cacheKey = `chatHistory:${req.user.userId}:${summaryId}`;
            
            // Try to get cached chat history
            const cachedChatHistory = await redisClient.get(cacheKey);
            if (cachedChatHistory) {
                existingChatHistory = JSON.parse(cachedChatHistory);
            } else {
                // If not in cache, fetch from database
                existingChatHistory = await ChatHistory.findOne({ summary_id: summaryId, user: req.user.userId }).populate('chathistory');
                if (existingChatHistory) {
                    // Cache the chat history for 1 hour
                    await redisClient.setEx(cacheKey, 3600, JSON.stringify(existingChatHistory));
                }
            }

            if (existingChatHistory) {
                conversation = existingChatHistory.chathistory.flatMap(chat => [
                    { role: 'user', content: chat.prompt },
                    { role: 'assistant', content: chat.answer }
                ]);
            }
        }

        prompt = prompt.replace(/\[\/?INST\]/g, "");

        const systemPrompt = _rag_query_text + contexts.map((c, i) => `[[citation:${i + 1}]] ${c.snippet}`).join("\n\n");

        conversation.push({ role: 'system', content: systemPrompt });
        conversation.push({ role: 'user', content: prompt });

        const assistantResponse = await AI.aiGroq(systemPrompt, prompt, conversation);

        conversation.push({ role: 'assistant', content: assistantResponse });

        // Extract sources from contexts
        const sources = contexts.map(c => ({
            name: c.name || '',
            url: c.url || ''
        })).filter(s => s.name || s.url);

        let chat = await Chat.create({
            summary_id: summaryId || (await ChatHistory.countDocuments()) + 1,
            user: req.user.userId,
            images: images,
            prompt: prompt,
            answer: assistantResponse,
            sources:sources
        });

        if (existingChatHistory) {
            existingChatHistory.chathistory.push(chat);
            await existingChatHistory.save();
        } else {
            summaryId = (await ChatHistory.countDocuments()) + 1;
            await ChatHistory.create({
                summary_id: summaryId,
                user: req.user.userId,
                chathistory: [chat],
            });
        }

        // After updating the chat history, invalidate the cache
        if (summaryId) {
            const cacheKey = `chatHistory:${req.user.userId}:${summaryId}`;
            await redisClient.del(cacheKey);
        }

        res.json({
            id:chat.id,
            summary_id: summaryId,
            images: images,
            prompt: prompt,
            answer: assistantResponse,
            isPinned: false,
            sources: sources
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports.generateRelatedQueries = async function(req,res){

    const { chatId } = req.body;

    try {
        // Extract the answer from the database using the chatId
        const chat = await Chat.findById(chatId);
        console.log(chatId,chat);
        if (!chat) {
            return res.status(404).json({ error: "Chat not found" });
        }

    const response = chat.answer;
    const prompt = `Based on the following response, generate related search queries:\n\n${response}\n\nRelated queries:`;
    const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama3-70b-8192',
        temperature: 0.4,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null
});
    const logicalQuestionsResponse = chatCompletion.choices[0].message.content;
    let logicalQuestions = logicalQuestionsResponse.split("\n").map(q => q.trim()).filter(Boolean);

    logicalQuestions = logicalQuestions.slice(1, -1).map(q => q.replace(/^\d+\.\s*/, ''));
    await Chat.findByIdAndUpdate(chatId, { relatedQuestions:logicalQuestions });
    return res.json({ans:logicalQuestions});

} catch (error) {
    console.error("Error generating related queries:", error);
    res.status(500).json({ error: "An error occurred while generating the related queries" });
}
};

module.exports.generateQuerySummary = async function(req, res) {
    const { chatId } = req.body;

    try {
        // Extract the answer from the database using the chatId
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ error: "Chat not found" });
        }

        const response = chat.answer;

        const prompt = `Summarize the following response in 20-50 words:\n\n${response}\n\nSummary:`;
        
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'llama3-70b-8192',
            temperature: 0.4,
            max_tokens: 1024,
            top_p: 1,
            stream: false,
            stop: null
        });

        const summary = chatCompletion.choices[0].message.content.trim();

        // Update the chat document with the new summary
        await Chat.findByIdAndUpdate(chatId, { summary });

        return res.json({ summary });
    } catch (error) {
        console.error("Error generating summary:", error);
        res.status(500).json({ error: "An error occurred while generating the summary" });
    }
};
