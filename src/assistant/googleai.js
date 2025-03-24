import { GoogleGenerativeAI } from "@google/generative-ai";

const googleai = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY);

export const generatePost = async (postIdea, tone, audienceFocus, postType, isMarkdown) => {
    try {
        const model = googleai.getGenerativeModel({ model: "gemini-1.5-flash" });  // Use "gemini-pro" or relevant model
        const format = isMarkdown ? "markdown" : "plain text";
        //const prompt = `Generate a single LinkedIn post in a ${tone} tone based on the idea: "${postIdea}"`;
        let prompt = ``;
        if (postType.toLowerCase() == 'storytelling') {
            prompt = `Write a compelling and engaging ${postType.toLowerCase()} post designed for a ${audienceFocus.toLowerCase()} audience. The post should adopt a ${tone.toLowerCase()} tone and focus on the topic: "${postIdea}". Write to include some professional work experiences. Ensure the content is concise, thought-provoking, and encourages meaningful engagement suitable for LinkedIn networking. Format the output as ${format}.`
        }
        else{
            prompt = `Write a compelling and engaging ${postType.toLowerCase()} post designed for a ${audienceFocus.toLowerCase()} audience. The post should adopt a ${tone.toLowerCase()} tone and focus on the topic: "${postIdea}". Ensure the content is concise, thought-provoking, and encourages meaningful engagement suitable for LinkedIn networking. Format the output as ${format}.`
        }

        
        //`Create a ${tone.toLowerCase()} LinkedIn post about: "${postIdea}".  
        //Conclude with a strong CTA (Call to Action).`

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error generating post:", error);
        throw new Error("Failed to generate post. Please try again.");
    }
};

export default generatePost;