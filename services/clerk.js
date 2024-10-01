import { Clerk } from "@clerk/clerk-sdk-node";


const clerk = new Clerk({
  apiKey: process.env.CLERK_API_KEY, // Store API key in environment variable
});