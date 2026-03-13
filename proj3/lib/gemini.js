const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateItinerary(destination, days) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Generate a detailed day-by-day travel itinerary for a ${days}-day trip to ${destination}. Provide a structured response with daily activities and highlights.`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

module.exports = { generateItinerary };
