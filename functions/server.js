// Import necessary modules
import express from "express";
import bodyParser from "body-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors"; // Import the CORS middleware
import serverless from "serverless-http";  // Import the serverless-http library

// Initialize the Express app
const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI("AIzaSyCiBfq7qBCsFtcIZR5fDL5CIvJhbVKx2-g"); // Your API key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Endpoint to process prompts
app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required!" });
    }

    // Generate content
    const result = await model.generateContent(prompt);

    // Send response back
    res.status(200).json({ response: result.response.text() });
  } catch (error) {
    console.error("Error generating content:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating content." });
  }
});

// Export the app as a serverless function
module.exports.handler = serverless(app);
