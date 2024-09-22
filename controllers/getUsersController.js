import { supabase } from "../supabase/connection.js";

export const getAllUsersController = async (req, res) => {
  try {
    // Extract page and limit from query params, default to page 1 and limit 10
    const { page = 1, limit = 10 } = req.query;

    // Calculate the range for pagination
    const start = (page - 1) * limit;
    const end = start + parseInt(limit) - 1;

    // Fetch users from the Supabase 'user' table with the given range
    const { data, error, count } = await supabase
      .from("user")
      .select("*", { count: "exact" }) // get total count as well
      .range(start, end)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while fetching users.",
      });
    }

    // Pagination metadata
    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      success: true,
      users: data,
      meta: {
        totalUsers: count,
        currentPage: parseInt(page),
        totalPages: totalPages,
        perPage: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error occurred.",
    });
  }
};
