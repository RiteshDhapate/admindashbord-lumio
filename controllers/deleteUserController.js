import { supabase } from "../supabase/connection.js";

export const deleteUserController = async (req, res) => {
  const { id } = req.params;

  try {
    // Step 1: Delete all messages related to the user's chat sessions
    const { error: deleteMessagesError } = await supabase
      .from("message")
      .delete()
      .eq("user_id", id);

    if (deleteMessagesError) {
      console.error("Error deleting messages for user:", deleteMessagesError);
      return res.status(500).json({
        success: false,
        message: "Error occurred while deleting user's messages.",
      });
    }

    // Step 2: Delete all chat sessions related to the user
    const { error: deleteChatsError } = await supabase
      .from("chat")
      .delete()
      .eq("user_id", id);

    if (deleteChatsError) {
      console.error("Error deleting chats for user:", deleteChatsError);
      return res.status(500).json({
        success: false,
        message: "Error occurred while deleting user's chats.",
      });
    }

    // Step 3: Delete the user after related messages and chats are deleted
    const { error: deleteUserError } = await supabase
      .from("user")
      .delete()
      .eq("user_id", id);

    if (deleteUserError) {
      console.error("Error deleting user:", deleteUserError);
      return res.status(500).json({
        success: false,
        message: "Error occurred while deleting the user.",
      });
    }

    // Success
    res.status(200).json({
      success: true,
      message: `User with ID ${id} deleted successfully, along with related messages and chats.`,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error occurred while deleting the user.",
    });
  }
};
