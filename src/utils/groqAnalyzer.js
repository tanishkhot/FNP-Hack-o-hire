require('dotenv').config(); 
const Groq = require('groq-sdk');
const fs = require('fs');
const path = require('path');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function analyzeError(errorLog) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an error analyzer. Always respond with a valid JSON object containing exactly these fields: {"explanation": "error explanation here", "solution": "solution here"}. Do not include any other text or formatting.'
        },
        {
          role: 'user',
          content: `Analyze this error log and provide a clear explanation and solution: ${errorLog}`
        }
      ],
      model: 'llama3-70b-8192',
      temperature: 0.1,
    });

    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error('Error analyzing with Groq:', error);
    return {
      explanation: 'Error analyzing log with Groq',
      solution: 'Please try again later'
    };
  }
}

module.exports = { analyzeError };