import { supabase } from "../supabase/connection.js";

export const getTotalUsersController = async (req, res) => {
  try {
    const { data, error, count } = await supabase
      .from("user")
      .select("*", { count: "exact" });

    if (error) {
      console.error("Error fetching user count:", error);
      res
        .status(500)
        .json({
          success: false,
          message: "something want wrong to fetch the total users.",
        });
    }

    console.log("Total users:", count);
    res.status(200).json({
      success: true,
      message: "total users fetched successfully",
      count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error occurred while fetching user count",
    });
  }
};
