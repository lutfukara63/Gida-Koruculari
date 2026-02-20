import axios from 'axios';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const GEMINI_API_URL = 'https://api.gemini.com/v1';
const API_KEY = process.env.GEMINI_API_KEY; // Make sure to set this in your .env

if (!API_KEY) {
  throw new Error('API key is missing.');
}

/**
 * Function to make calls to Gemini API
 */
export const callGeminiApi = async (endpoint: string, method = 'GET', data?: any) => {
  const url = `${GEMINI_API_URL}${endpoint}`;
  
  const options = {
    method,
    url,
    headers: {
      'Content-Type': 'application/json',
      'X-GEMINI-APIKEY': API_KEY,
    },
    data,
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};
