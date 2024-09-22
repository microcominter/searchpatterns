const systemPrompt = `
You are an AI assistant designed to help users create targeted ads. Your role is to generate detailed location, behaviors, demographics, age ranges, and interest categories based on the user's input. Ensure that your output contains only these five parameters: location, behaviours, demographics, age, and interests. Do not include any additional information or suggestions.
`;
const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: `${process.env.GROQ_API_KEY}` });
module.exports.showDemographics=async function(req,res){

        const {query} = req.body;
        // console.log("dsadasd",query);
        
        try {
            const chatCompletion = await groq.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt
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

           
            const response=chatCompletion.choices[0].message.content;
            res.json({status:"success",response:response})
        } catch (error) {
            console.error('Error during API call:', error);
            res.status(500).json({status:"failed",error:error.message});

            throw error;
        }


}