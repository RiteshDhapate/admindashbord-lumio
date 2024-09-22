import { supabase } from "../supabase/connection.js";

export const getPerWeekMessagesController = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("message")
      .select("created_at, count(*)", { count: "exact" })
      .group("date_trunc('week', created_at)")
      .order("date_trunc('week', created_at)", { ascending: true });

    if (error) {
      console.error("Error fetching messages per week:", error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong while fetching the total messages per week.",
      });
    }

    // Process the data to count messages per week
    const messagesPerWeek = data.map((weekData) => ({
      weekStart: weekData.created_at,
      messageCount: weekData.count,
    }));

    console.log("Messages per week:", messagesPerWeek);
    res.status(200).json({
      success: true,
      message: "Per week messages fetched successfully.",
      messagesPerWeek,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error occurred while fetching per week messages.",
    });
  }
};
