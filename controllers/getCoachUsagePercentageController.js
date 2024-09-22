import { supabase } from "../supabase/connection.js";

// Controller to calculate the usage percentage for each coach type
export const getCoachUsagePercentageController = async (req, res) => {
  try {
    // Fetch the total number of chats from the "chat" table
    const { data: chatsData, error: chatsError } = await supabase
      .from("chat")
      .select("coach_type");

    if (chatsError) {
      console.error("Error fetching chats:", chatsError);
      return res.status(500).json({
        success: false,
        message: "Error fetching chat data.",
      });
    }

    // Initialize the AI usage counts
    const aiS = {
      General: 0,
      Motivation: 0,
      Negotiations: 0,
      Sales: 0,
      general: 0,
      "Real Estate": 0,
      Marketing: 0,
      Negotiation: 0,
    };

    // Count the occurrences of each AI type
    for (let i = 0; i < chatsData.length; i++) {
      const coach = chatsData[i];
      if (aiS[coach.coach_type] !== undefined) {
        aiS[coach.coach_type]++;
      }
    }

    // Calculate the total number of chats
    const totalChats = Object.values(aiS).reduce(
      (total, count) => total + count,
      0
    );

    // Calculate the percentage for each AI type
    const aiPercentages = {};
    for (const ai in aiS) {
      aiPercentages[ai] = ((aiS[ai] / totalChats) * 100).toFixed(2); // Calculate % and format to 2 decimal places
    }

    // Return the result as a JSON response
    return res.status(200).json({
      success: true,
      message: "AI usage percentages fetched successfully.",
      usages: aiS,
      usagesInPercentage: aiPercentages,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error occurred while fetching AI usage.",
    });
  }
};
