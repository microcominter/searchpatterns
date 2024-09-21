const express = require('express');
const cors = require('cors');
const session = require('express-session');
const axios = require('axios');
const Groq = require('groq-sdk');
const app = express();
app.use(cors({origin:'http://localhost:3000',
    credentials:true,
    optionsSuccessStatus:204,

}));
app.use(express.json());
app.use(session({
    secret: 'searchpatternsbackendwork',
    resave: false,
    saveUninitialized: false,
}));

SERPER_API = "729640657296e51b6a87b0b3f44f663ee621b9c4"
SERPER_SEARCH_ENDPOINT = "https://api.tavily.com/search"
REFERENCE_COUNT = 15
DEFAULT_SEARCH_ENGINE_TIMEOUT = 5000
GROQ_API = "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"

const _rag_query_text = `
You are a large language AI assistant built by Search Patterns. You are given a user question, and please write clean, concise, and accurate answer to the question. You will be given a set of related contexts to the question, use these contexts and your own knowledge to give brief answers to the user query.

Your answer must be correct, accurate, and written by an expert using an unbiased and professional tone in brief as much as possible. Please limit to 1024 tokens. Do not give any information that is not related to the question, and do not repeat. Say "information is missing on" followed by the related topic, if the given context does not provide sufficient information.

Remember, don't blindly repeat the contexts and do not give reference to other sites in your answer, keep your answer as much as brief as possible with your knowledge and from the context. And here is the user question:
Remember, dont show context of your answer keep it hidden while showing answers
Remember, never ever show your user that you are giving your answers through context
Remember, add your own knowledge into it to answers as brief as you can

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

async function searchWithSerper(query) {
    const payload = {
        query: query,
        api_key: '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',
        include_answer: true,
        include_images:true,
        search_depth: 'advanced',
        topic:"general"

    };
    const headers = { "Content-Type": "application/json" };
    try {
        const response = await axios.post(SERPER_SEARCH_ENDPOINT, payload, { headers, timeout: DEFAULT_SEARCH_ENGINE_TIMEOUT });
        const jsonContent = response.data;
        console.log(jsonContent);
        
        let contexts = [];
        let images=[];
        // if (jsonContent.knowledgeGraph) {
            //     const url = jsonContent.knowledgeGraph.descriptionUrl || jsonContent.knowledgeGraph.website;
        //     const snippet = jsonContent.knowledgeGraph.description;
        //     if(jsonContent.knowledgeGraph.imageUrl){
        //         images.push(jsonContent.knowledgeGraph.imageUrl);
        //     }
        //     if (url && snippet) {
        //         contexts.push({ name: jsonContent.knowledgeGraph.title || "", url, snippet });
        //     }
        // }
        if(jsonContent.answer){
            contexts.push({answer:jsonContent.answer});
        }
        if(jsonContent.images){
            images=jsonContent.images;
        }
        if(jsonContent.results){
            jsonContent.results.forEach(element => {
                contexts.push({
                    title:element.title,
                    url:element.url,
                    snippet:element.content
                })
            });
        }
        // if (jsonContent.answerBox) {
            //     const url = jsonContent.answerBox.url;
            //     const snippet = jsonContent.answerBox.snippet || jsonContent.answerBox.answer;
            //     if (url && snippet) {
                //         contexts.push({ name: jsonContent.answerBox.title || "", url, snippet });
                //     }
                // }
                // if(jsonContent.topStories){
                    //     jsonContent.topStories.forEach((story) => {
                        //         images.push(story.imageUrl);
                        //     })
                        // }
                        // contexts = contexts.concat(jsonContent.organic.map(c => ({ name: c.title, url: c.link, snippet: c.snippet || "" })));
                        // return { contexts: contexts.slice(0, 10), images };
                        console.log("jsonContetn",contexts);
                        return {contexts,images};
                    } catch (error) {
        throw new Error("Search engine error.");
    }
}

class AI {
    static async aiGroq(system_prompt, query) {
        // const groq = new Groq({
        //     baseURL: 'https://api.groq.com/openai/v1', // Make sure this matches the actual base URL of the Groq API
        //     apiKey: 'GROQ_API' // Replace with your actual API key
        // });
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

            // let chunks = [];

            // for await (const chunk of chatCompletion) {
            //     const content = chunk.choices[0]?.delta?.content || '';
            //     process.stdout.write(content); // Print real-time response
            //     chunks.push(content); // Accumulate chunk
            // }

            // console.log("\n\n");
            // const completeResponse = chunks.join('');
            return chatCompletion.choices[0].message.content;
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

function generateAnswer(query, contexts) {
    query = query.replace(/\[\/?INST\]/g, "");

    const systemPrompt = _rag_query_text + contexts.map((c, i) => `[[citation:${i + 1}]] ${c.snippet}`).join("\n\n");

    // Ensure AI.aiGroq is correctly defined and used
    return AI.aiGroq(systemPrompt, query);
}

function generateSummary(query, contexts) {
    const systemPrompt = _summary_query_text + contexts.map(c => c.snippet).join("\n\n");
    return AI.aiGroq(systemPrompt, query);
}

app.post('/api/context', async (req, res) => {
    console.log("post request recieved");
    
    const { query } = req.body;
    try {
        const {contexts,images} = await searchWithSerper(query);
        req.session.contexts = contexts;
        req.session.images=images;
        res.json({
            sources: contexts.map(c => c.url),
            contexts,
            images
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/answer', (req, res) => {
    const { query } = req.body;
    const contexts = req.session.contexts || [];
    const images = req.session.images || [];

    if (contexts.length === 0) {
        return res.status(400).json({ error: "Context not found. Please fetch context first." });
    }

    generateAnswer(query, contexts)
        .then(answer => {
            res.json({
                sources: contexts.map(c => c.url),
                answer,
                images
            });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

app.post('/api/related_questions', (req, res) => {
    const { query } = req.body;
    const contexts = req.session.contexts || [];
    if (contexts.length === 0) {
        return res.status(400).json({ error: "Context not found. Please fetch context first." });
    }

    getRelatedQuestions(query, contexts)
        .then(relatedQuestions => {
            res.json({
                sources: contexts.map(c => c.url),
                related_questions: relatedQuestions
            });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

app.post('/api/summary', (req, res) => {
    const { query } = req.body;
    const contexts = req.session.contexts || [];
    if (contexts.length === 0) {
        return res.status(400).json({ error: "Context not found. Please fetch context first." });
    }

    generateSummary(query, contexts)
        .then(summary => {
            res.json({
                sources: contexts.map(c => c.url),
                summary
            });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

// async function index(){
//     const res=await axios.get("https://www.googleapis.com/customsearch/v1?key=AIzaSyDQScJ7bXvqJnk8DC46jxFzkyAF8am-Chw&cx=a6d1522028d0a4237&q=lectures");
//     console.log(res.items);
// }
// index();
// searchWithSerper("olympics 2024 news from yesterday").then((res)=> {
//     console.log("serach fetched successfully");
    
//     generateAnswer("olympics 2024 news from yesterday",res).then((ans)=>{
//         console.log("ans",ans);
//     });



// }


// )



// .catch((err)=> console.log(err))

// AI.aiGroq("You are a helpful assistant", "hii how are you").then((ans)=> console.log(ans,"got you message"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
