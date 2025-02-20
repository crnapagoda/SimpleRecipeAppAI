# Simple Fit Recipes

Simple Fit Recipes is a web application designed to help users generate and save healthy recipes based on their fitness goals and dietary preferences. The application uses AI services to generate personalized recipes and allows users to manage their profiles and saved recipes.

## Features

- User authentication (register, login, token refresh)
- User profile management
- Recipe generation based on user profile
- Save and manage recipes
- View detailed recipe information

## Technologies Used

- Frontend: React, Bootstrap
- Backend: Node.js, Express, MongoDB
- AI Services: OpenAI, Gemini

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/simple-fit-recipes.git
   ```

2. Navigate to the project directory:
   ```bash
   cd simple-fit-recipes
   ```

3. Install dependencies for the frontend:
   ```bash
   cd fronted
   npm install
   ```

4. Install dependencies for the backend:
   ```bash
   cd ../backend
   npm install
   ```

5. Create a `.env` file in the backend directory and add the following environment variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=your_openai_api_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

6. Start the backend server:
   ```bash
   npm start
   ```

7. Start the frontend development server:
   ```bash
   cd ../fronted
   npm start
   ```

## Usage

1. Register a new user or log in with an existing account.
2. Update your profile with your fitness goals and dietary preferences.
3. Generate a recipe based on your profile.
4. Save and manage your recipes.
5. View detailed information about your saved recipes.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

## Note

This project is a work in progress. Some features may not be fully implemented yet.