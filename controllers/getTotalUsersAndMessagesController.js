import { supabase } from "../supabase/connection.js";

export const getTotalUsersAndMessagesController = async (req, res) => {
 try {
   // Get total users count
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

   // Get total messages count
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

   // Get the latest 6 users without password
   const { data: latestUsers, error: latestUsersError } = await supabase
     .from("user")
     .select("user_id, email, name, created_at") // Specify fields to exclude password
     .order("created_at", { ascending: false })
     .limit(6);

   if (latestUsersError) {
     console.error("Error fetching latest users:", latestUsersError);
     return res.status(500).json({
       success: false,
       message: "Something went wrong while fetching the latest users.",
     });
   }

   console.log("Total users:", userCount);
   console.log("Total messages:", messageCount);
   console.log("Latest users:", latestUsers);

   res.status(200).json({
     success: true,
     message: "Total users, messages, and latest users fetched successfully",
     totalUsers: userCount,
     totalMessages: messageCount,
     latestUsers,
   });
 } catch (error) {
   console.error("Internal server error:", error);
   res.status(500).json({
     success: false,
     message: "Internal server error occurred while fetching counts",
   });
 }
};
