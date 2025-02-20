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
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log("Gemini API Response:", response.data); // Debugging
    
    if (response.data && response.data.candidates && response.data.candidates[0] && response.data.candidates[0].content && response.data.candidates[0].content.parts && response.data.candidates[0].content.parts[0]) {
      return response.data.candidates[0].content.parts[0].text.trim();
    } else {
      throw new Error('Unexpected response structure from Gemini API');
    }
  } catch (error) {
    console.error(
      'Error with Gemini API:',
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
