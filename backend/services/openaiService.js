// services/openaiService.js
const axios = require('axios');

const generateRecipe = async (userProfile) => {
  // Ensure foodPreferences is always an array
  const foodPreferences = userProfile.foodPreferences || [];

  // Create a prompt using user profile details
  const prompt = `Generate a healthy recipe for someone with a fitness goal of ${userProfile.fitnessGoal} and dietary preferences: ${foodPreferences.join(
    ', '
  )}. Include ingredients, instructions, and nutritional info.`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo', // Use the newer model
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    console.log("OpenAI API Response:", response.data); // Debugging
    
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error(
      'Error with OpenAI API:',
      error.response ? error.response.data : error.message
    );
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      console.error('Data:', error.response.data);
    }
    throw error;
  }
};

module.exports = { generateRecipe };
