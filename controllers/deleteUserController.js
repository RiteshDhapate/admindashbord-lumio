import { clerkClient } from "../services/clerkClient.js";

export const deleteUserController = async (req, res) => {
  const { id } = req.params;
console.log(id)
  try {
    if (!id) {
      res.json({ error: "please provide a unique id" });
      return;
    }
    const response = await clerkClient.users.deleteUser(id);
    console.log("user deleted successfully", response);

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
