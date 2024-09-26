import { supabase } from "../supabase/connection.js";

// Controller to get total users, total messages, latest users, and AI usage percentages
export const getDashboardDataController = async (req, res) => {
  try {
    // 1. Get total users count
    const {
      data: usersData,
      error: userError,
      count: userCount,
    } = await supabase.from("user").select("*", { count: "exact" });

    if (userError) {
      console.error("Error fetching user count:", userError);
      return res.status(500).json({
        success: false,
        message: "Something went wrong while fetching the total users.",
      });
    }

    // 2. Get total messages count
    const {
      data: messagesData,
      error: messageError,
      count: messageCount,
    } = await supabase.from("message").select("*", { count: "exact" });

    if (messageError) {
      console.error("Error fetching message count:", messageError);
      return res.status(500).json({
        success: false,
        message: "Something went wrong while fetching the total messages.",
      });
    }

    // 3. Get the latest 7 users without password
    const { data: latestUsers, error: latestUsersError } = await supabase
      .from("user")
      .select("user_id, email, name, created_at") // Specify fields to exclude password
      .order("created_at", { ascending: false })
      .limit(5);

    if (latestUsersError) {
      console.error("Error fetching latest users:", latestUsersError);
      return res.status(500).json({
        success: false,
        message: "Something went wrong while fetching the latest users.",
      });
    }

    // 4. Get AI/coach usage percentages
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
      Sales: 0,
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

    // Return all data (total users, total messages, latest users, and AI usage percentages) as a JSON response
    return res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully.",
      totalUsers: userCount,
      totalMessages: messageCount,
      latestUsers,
      aiUsage: aiS,
      aiUsagePercentages: aiPercentages,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error occurred while fetching dashboard data.",
    });
  }
};
